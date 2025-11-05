import { useContext } from 'react'
import { ServiceContext } from '@/contexts/service'
import { useW3 } from '@storacha/ui-react'

export function useServicePrincipal () {
  const { servicePrincipal } = useContext(ServiceContext)
  return servicePrincipal
}
