'use client'

import { useEffect, useState, createContext, type JSX } from "react"
import { ServiceMethod, DIDKey, InferInvokedCapability } from '@ucanto/interface'
import * as Server from '@ucanto/server'
import { CAR, HTTP } from '@ucanto/transport'
import * as Ucanto from '@ucanto/interface'
import { Admin, Customer, Consumer, Subscription, RateLimit } from '@storacha/capabilities'
import { webDidFromMailtoDid } from '@/util/did'
import { spaceOneDid, spaceTwoDid } from '@/util/spaces'
import {
  CustomerGetSuccess,
  CustomerGetFailure,
  ConsumerGetSuccess,
  ConsumerGetFailure,
  SubscriptionGetSuccess,
  SubscriptionGetFailure,
  RateLimitAddSuccess,
  RateLimitAddFailure,
  RateLimitRemoveSuccess,
  RateLimitRemoveFailure,
  RateLimitListSuccess,
  RateLimitListFailure,
  RateLimitSubject,
  AdminUploadInspectSuccess,
  AdminUploadInspectFailure,
  AdminStoreInspectSuccess,
  AdminStoreInspectFailure
} from "@storacha/capabilities/types"
import { Absentee } from "@ucanto/principal"
import { useW3 } from "@storacha/ui-react"

export type AccountDID = Ucanto.DID<'mailto'>

export type Customer = {
  did: AccountDID
  subscriptions: string[]
  blocked: boolean
  domainBlocked: boolean
}

export interface Service {
  customer: {
    get: ServiceMethod<
      InferInvokedCapability<typeof Customer.get>,
      CustomerGetSuccess & { subscriptions: string[] },
      CustomerGetFailure
    >
  },
  consumer: {
    get: ServiceMethod<
      InferInvokedCapability<typeof Consumer.get>,
      ConsumerGetSuccess,
      ConsumerGetFailure
    >
  },
  subscription: {
    get: ServiceMethod<
      InferInvokedCapability<typeof Subscription.get>,
      SubscriptionGetSuccess,
      SubscriptionGetFailure
    >
  },
  'rate-limit': {
    add: ServiceMethod<
      InferInvokedCapability<typeof RateLimit.add>,
      RateLimitAddSuccess,
      RateLimitAddFailure
    >,
    remove: ServiceMethod<
      InferInvokedCapability<typeof RateLimit.remove>,
      RateLimitRemoveSuccess,
      RateLimitRemoveFailure
    >,
    list: ServiceMethod<
      InferInvokedCapability<typeof RateLimit.list>,
      RateLimitListSuccess,
      RateLimitListFailure
    >
  },
  admin: {
    upload: {
      inspect: ServiceMethod<
        InferInvokedCapability<typeof Admin.upload.inspect>,
        AdminUploadInspectSuccess,
        AdminUploadInspectFailure
      >
    },
    store: {
      inspect: ServiceMethod<
        InferInvokedCapability<typeof Admin.store.inspect>,
        AdminStoreInspectSuccess,
        AdminStoreInspectFailure
      >
    }
  }
}

type CustomerRow = Pick<Customer, 'did' | 'subscriptions' | 'blocked'>

const customers: Record<string, CustomerRow> = {
  'did:mailto:example.com:travis': {
    did: 'did:mailto:example.com:travis',
    subscriptions: ['did:mailto:example.com:travis@test'],
    blocked: false,
  },
  'did:mailto:dag.house:travis': {
    did: 'did:mailto:dag.house:travis',
    subscriptions: ['did:mailto:dag.house:travis@test'],
    blocked: false,
  },
}

interface DomainRow {
  blocked: boolean
}

const domains: Record<string, DomainRow> = {
}

interface SpaceRow {
  allocated: number
  limit: number
  subscription: Ucanto.DID<'mailto'>
}

const spaces: Record<string, SpaceRow> = {
  [spaceOneDid]: {
    allocated: 345093845,
    limit: 1000000000,
    subscription: 'did:mailto:example.com:travis@test',
  },

  [spaceTwoDid]: {
    allocated: 9386794576,
    limit: 1500000000,
    subscription: 'did:mailto:dag.house:travis@test',
  }
}

interface SubscriptionRow {
  customer: Ucanto.DID<'mailto'>
  consumer: DIDKey
}

const subscriptions: Record<string, SubscriptionRow> = {
  'did:mailto:example.com:travis@test': {
    customer: 'did:mailto:example.com:travis',
    consumer: spaceOneDid
  },
  'did:mailto:dag.house:travis@test': {
    customer: 'did:mailto:dag.house:travis',
    consumer: spaceTwoDid
  }
}

interface RateLimitRow {
  subject: string
  rate: number
}

const rateLimits: RateLimitRow[] = []

export async function createLocalServer (id: Ucanto.Signer) {
  return Server.create<Service>({
    id,
    // TODO: check revocations here
    validateAuthorization: () => ({ ok: {} }),
    service: {
      customer: {
        get: Server.provide(Customer.get, async ({ capability }) => {
          const did = capability.nb.customer
          const domainBlocked = domains[webDidFromMailtoDid(did)]?.blocked
          if (customers[did]) {
            return {
              ok: {
                ...customers[did]
              }
            }
          } else {
            return {
              error: {
                name: 'CustomerNotFound',
                message: `could not find ${did}`
              }
            }
          }
        }),
      },
      consumer: {
        get: Server.provide(Consumer.get, async ({ capability }) => {
          const did = capability.nb.consumer
          if (spaces[did]) {
            return {
              ok: {
                did,
                ...spaces[did],
                customer: subscriptions[did].customer
              }
            }
          } else {
            return {
              error: {
                name: 'ConsumerNotFound',
                message: `could not find ${did}`
              }
            }
          }
        }),
      },
      subscription: {
        get: Server.provide(Subscription.get, async ({ capability }) => {
          if (subscriptions[capability.nb.subscription]) {
            return {
              ok: subscriptions[capability.nb.subscription]
            }
          } else {
            return {
              error: {
                name: 'SubscriptionNotFound',
                message: `could not find subscription with id ${capability.nb.subscription}`
              }
            }
          }
        })
      },
      'rate-limit': {
        add: Server.provide(RateLimit.add, async ({ capability }) => {
          rateLimits.push(capability.nb)
          return { ok: { id: (rateLimits.length - 1).toString() } }
        }),
        remove: Server.provide(RateLimit.remove, async ({ capability }) => {
          delete rateLimits[parseInt(capability.nb.id)]
          return { ok: {} }
        }),
        list: Server.provide(RateLimit.list, async ({ capability }) => {
          return {
            ok: {
              limits: rateLimits.map(({ rate, subject }, i) => {
                if (subject === capability.nb.subject) {
                  return ({ rate, id: i.toString() })
                } else {
                  return null
                }
              }).filter(x => x) as RateLimitSubject[]
            }
          }
        }),
      },
      admin: {
        store: {
          inspect: Server.provide(Admin.store.inspect, async ({}) => {
            return {
              ok: {
                spaces: []
              }
            }
          })
        },
        upload: {
          inspect: Server.provide(Admin.upload.inspect, async ({}) => {
            return {
              ok: {
                spaces: []
              }
            }
          })
        }
      }
    },
    codec: CAR.inbound
  })
}

interface ServiceContextValue {
  servicePrincipal?: Ucanto.Principal
}

export const ServiceContext = createContext<ServiceContextValue>({})

export function ServiceProvider ({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [{client}] = useW3()
  const servicePrincipal = client?.agent.connection.id

  return (
    <ServiceContext.Provider value={{
      servicePrincipal,
    }}>
      {children}
    </ServiceContext.Provider>
  )
}
