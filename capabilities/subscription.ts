import { capability, struct, ok, Schema } from '@ucanto/validator'
import { Utils, Customer } from '@storacha/capabilities'

const { equal, equalWith, and } = Utils
const { ProviderDID } = Customer

export const get = capability({
  can: 'subscription/get',
  with: ProviderDID,
  nb: struct({
    subscription: Schema.string()
  }),
  derives: (child, parent) => {
    return (
      and(equalWith(child, parent)) ||
      and(equal(child.nb.subscription, parent.nb.subscription, 'subscription')) ||
      ok({})
    )
  },
})

export const Subscription = { get }
