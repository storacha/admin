import { DID } from '@ucanto/interface';
import { toEmail } from '@storacha/did-mailto';
import { DidMailto } from '@storacha/did-mailto';

export function webDidFromMailtoDid (did: DID<'mailto'>) {
  const domain = toEmail(did as DidMailto).split('@')[1];
  return `did:web:${domain}` as DID<'web'>;
}
