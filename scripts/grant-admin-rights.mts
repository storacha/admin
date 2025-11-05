import { delegate } from '@ucanto/core'
import { create } from '@storacha/client'
import * as Signer from '@ucanto/principal/ed25519'
import { Absentee } from '@ucanto/principal'
import * as DIDMailto from '@storacha/did-mailto'
import { MemoryDriver } from '@storacha/access/drivers/memory'

// 90 days, in minutes
const EXPIRY = 60 * 24 * 90

// this must be run with the private key of the service passed as SERVICE_PRIVATE_KEY
const servicePrincipal = process.env.SERVICE_PRIVATE_KEY ? Signer.parse(process.env.SERVICE_PRIVATE_KEY).withDID("did:web:up.storacha.network") : undefined
if (!servicePrincipal) throw new Error("Principal not defined, can't continue.")

const delegateeEmail = process.argv[2] as `${string}@${string}`
const delegateeDidMailto = DIDMailto.fromEmail(delegateeEmail)

// @ts-expect-error type mismatch on the signer here, but it's fine
const client = await create({ principal: servicePrincipal, store: new MemoryDriver() })
const delegation = await delegate({
  issuer: servicePrincipal,
  audience: Absentee.from({ id: delegateeDidMailto }),
  // grant capabilities needed for admin work
  capabilities: [
    { with: servicePrincipal.did(), can: 'customer/get' },
    { with: servicePrincipal.did(), can: 'consumer/get' },
    { with: servicePrincipal.did(), can: 'subscription/get' },
    { with: servicePrincipal.did(), can: 'rate-limit/*' },
    { with: servicePrincipal.did(), can: 'admin/*' },
  ],
  expiration: Math.floor(Date.now() / 1000) + (60 * EXPIRY)
})
await client.capability.access.delegate({
  // use the did:key of the service principal as the space to store the delegation in
  space: servicePrincipal.toDIDKey(),
  delegations: [delegation]
})

console.log(client)