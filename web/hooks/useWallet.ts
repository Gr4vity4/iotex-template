import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'

declare let window: any

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): boolean {
  try {
    return !!getAddress(value)
  } catch (_a) {
    return false
  }
}

export function getSigner(library: Web3Provider, account: string | undefined): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: Web3Provider, account: string | undefined) {
  return account ? getSigner(library, account) : library
}

export function getContract(
  address: string,
  ABI: ContractInterface,
  library: Web3Provider,
  account: string | undefined
) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

export function useContract(address: string, ABI: ContractInterface, withSignerIfPossible: boolean = true) {
  const { library, account } = useWeb3ReactCore()
  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error(error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

// export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: number } {
//   const context = useWeb3ReactCore<Web3Provider>()
//   const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
//   return context.active ? context : contextNetwork
// }

// export function useEagerConnect() {
//   const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
//   const [tried, setTried] = useState(false)

//   useEffect(() => {
//     injected.isAuthorized().then((isAuthorized: any) => {
//       if (isAuthorized) {
//         activate(injected, undefined, true).catch(() => {
//           setTried(true)
//         })
//       } else {
//         // eslint-disable-next-line no-use-before-define
//         if (isMobile && window.ethereum) {
//           activate(injected, undefined, true).catch(() => {
//             setTried(true)
//           })
//         } else {
//           setTried(true)
//         }
//       }
//     })
//   }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

//   // if the connection worked, wait until we get confirmation of that to flip the flag
//   useEffect(() => {
//     if (active) {
//       setTried(true)
//     }
//   }, [active])

//   return tried
// }

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
// export function useInactiveListener(suppress = false) {
//   const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

//   useEffect(() => {
//     const { ethereum } = window

//     if (ethereum && ethereum.on && !active && !error && !suppress) {
//       const handleChainChanged = (chainId: any) => {
//         // eat errors
//         activate(injected, undefined, true).catch((error) => {
//           console.error(error)
//         })
//       }

//       const handleAccountsChanged = (accounts: string[]) => {
//         if (accounts.length > 0) {
//           // eat errors
//           activate(injected, undefined, true).catch((error) => {
//             console.error(error)
//           })
//         }
//       }

//       ethereum.on('chainChanged', handleChainChanged)
//       ethereum.on('accountsChanged', handleAccountsChanged)

//       return () => {
//         if (ethereum.removeListener) {
//           ethereum.removeListener('chainChanged', handleChainChanged)
//           ethereum.removeListener('accountsChanged', handleAccountsChanged)
//         }
//       }
//     }
//     return undefined
//   }, [active, error, suppress, activate])
// }
