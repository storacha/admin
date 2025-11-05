# Changelog

## 1.0.0 (2025-11-05)


### Features

* add `subscription/get` capability ([a2162ef](https://github.com/storacha/admin/commit/a2162ef9de7807cfa03fe17a058e1608643fda94))
* add AgentContext ([bc041d6](https://github.com/storacha/admin/commit/bc041d6fffda408545f780220aeddac2112e870d))
* add another user ([c360a4c](https://github.com/storacha/admin/commit/c360a4c4eaa8371867e62024e29dd275abedb868))
* add block buttons ([f7ee95a](https://github.com/storacha/admin/commit/f7ee95a2def6e185120b0a6f0549f20ff2a3f56f))
* add console page with agent ([c97ce5a](https://github.com/storacha/admin/commit/c97ce5a1ceb19733dbbf91b539b2dbb31b7b7137))
* add GitHub actions to deploy to Cloudflare ([8d2624c](https://github.com/storacha/admin/commit/8d2624c5274ef52270f7a98f28e5d0deef461a81))
* add hint for users re: space name ([3fdb157](https://github.com/storacha/admin/commit/3fdb157a50fce952b28a1ac46cf12ec18653f71f))
* add remote services ([1dda5c4](https://github.com/storacha/admin/commit/1dda5c4b992a24621c98eef5a84912b763eaadbf))
* domain blocking ([79f216f](https://github.com/storacha/admin/commit/79f216f347f370b6ef42845f6aaffb66bbc47f64))
* enable users to customize delegation expiry ([#5](https://github.com/storacha/admin/issues/5)) ([1bea39c](https://github.com/storacha/admin/commit/1bea39c20a22bb91a5ac05b576796b5afe85f6f1))
* enable users to customize delegation expiry ([#6](https://github.com/storacha/admin/issues/6)) ([ecbe6dc](https://github.com/storacha/admin/commit/ecbe6dc10f613ee58d12f66869cb5cc6d916cc4a))
* full support for remote environments ([645ecea](https://github.com/storacha/admin/commit/645ecea28b85b191a06425a3a8b605d2e8550e85))
* get blocking working! ([5940637](https://github.com/storacha/admin/commit/59406370ac81f9fee13a97545678416328008b8f))
* get local service working with agent ([d5eac34](https://github.com/storacha/admin/commit/d5eac34a821ba2f7b4e4dd76fdb2bc59928f9a6a))
* get space/info working ([330e83a](https://github.com/storacha/admin/commit/330e83a2923d0b801a0af2c426a00a64bbe9411c))
* get w3admin working against my dev service ([a3eace5](https://github.com/storacha/admin/commit/a3eace5507f4096bf6eeb9f78312d66da1ed79f6))
* grab bag of usability enhancements ([5d0a456](https://github.com/storacha/admin/commit/5d0a45635aea37b7e61bb887df8b8f2f8a57a566))
* implement `space/block` ([2ad7680](https://github.com/storacha/admin/commit/2ad76805b2d651c701a3a04be9da27d747fe350c))
* implement CID lookup UI ([#10](https://github.com/storacha/admin/issues/10)) ([66c209d](https://github.com/storacha/admin/commit/66c209d34bcdbb130aac45423856b2c91c14b1ff))
* improve space page error handling ([17c1fb0](https://github.com/storacha/admin/commit/17c1fb01560e24f142b5811cf1a6282ea0329752))
* minor tweaks to interface definition ([7a335d5](https://github.com/storacha/admin/commit/7a335d59b22dfbdc44ad23826e629a1516c46faa))
* mock up basic subscriptions/spaces/customers flow ([4faf03d](https://github.com/storacha/admin/commit/4faf03d62c2c3918000474ca66e09b35cd795300))
* move service out to a context too ([147e689](https://github.com/storacha/admin/commit/147e689e5e35052ec97347247abcb9aad0b2d009))
* nav bar ([5de9055](https://github.com/storacha/admin/commit/5de90552ed9889f827032ce6c5c0d19a17a6c726))
* update to latest rate-limit capabilities ([3231930](https://github.com/storacha/admin/commit/32319307f978cd3e6770ff1cc9afc73a771c1c37))
* upgrade to next 16 ([#14](https://github.com/storacha/admin/issues/14)) ([e7ae9d4](https://github.com/storacha/admin/commit/e7ae9d49685961343b6f8ffb7a5273e6c7977664))
* use a consistent signer for the service ([563ce2d](https://github.com/storacha/admin/commit/563ce2dbd3619fc537f77265e5c12c0dad4112ab))
* use Cloudflare edge runtime ([d9e9e34](https://github.com/storacha/admin/commit/d9e9e347c686f04570f15e33196eeab473c47306))


### Bug Fixes

* adjust admin pages to use react ui kit ([#17](https://github.com/storacha/admin/issues/17)) ([76cd884](https://github.com/storacha/admin/commit/76cd88432bf9f870f7387ed8352caee4e44ffcc2))
* appease linter ([7651fcf](https://github.com/storacha/admin/commit/7651fcf249dc45eb5f5fd8affb9ae8bf374a3f44))
* background color ([4666889](https://github.com/storacha/admin/commit/4666889c67cb800c6dd8c5d319987c333e830bbf))
* bug in rate limits hook ([#8](https://github.com/storacha/admin/issues/8)) ([b99c68b](https://github.com/storacha/admin/commit/b99c68ba3eceb2e0247407b6f5dad5d9a3bfa73d))
* deploy permissions ([#15](https://github.com/storacha/admin/issues/15)) ([9218c2b](https://github.com/storacha/admin/commit/9218c2bd41715a4da9b3df18a7511ae951564448))
* handle email addresses with a + in them ([#12](https://github.com/storacha/admin/issues/12)) ([5a0a32b](https://github.com/storacha/admin/commit/5a0a32b7e7fb5a8e0c35a043f1a5cdaccec84718))
* remove export ([38b3cdb](https://github.com/storacha/admin/commit/38b3cdbe6b604a3cbb947884a3770087d830b564))
* remove now-unused deployment action ([39171ef](https://github.com/storacha/admin/commit/39171ef2adae2af35d695fac73991cf4a1f0c36b))
* remove unsupported layout features ([e0c5961](https://github.com/storacha/admin/commit/e0c5961f202ee6a94e413a0abac14f06d9fb9e2b))
* rework service context state ([d4e9dc3](https://github.com/storacha/admin/commit/d4e9dc305e28870f2f4ea6cac125728f3281b08b))
* use agent for capability invocation ([54348ff](https://github.com/storacha/admin/commit/54348ffef70dc4552776730f3beaab45ab12f378))
* workflow file ([#9](https://github.com/storacha/admin/issues/9)) ([fdd17c5](https://github.com/storacha/admin/commit/fdd17c54c2cf184115aa749adf6ee18009d53a9e))
