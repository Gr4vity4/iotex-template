import { Fragment, ReactNode, useState } from 'react'
import { Chain, defaultChains, InjectedConnector } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Web3ConfigurationContext } from '../config'
import { Strings, Theme } from '../constants'
import { ConnectWalletModal } from '../wallet/ConnectWalletModal'
import { WalletModalOpenContext } from './WalletModalOpenContext'

export const Web3ConfigProvider = ({
  rpcUrl,
  networkId,
  children,
  theme = {},
  strings = {},
}: {
  theme?: Partial<typeof Theme>
  strings?: Partial<typeof Strings>
  rpcUrl?: string
  networkId: number
  children: ReactNode
}) => {
  function getConnectors(networkId?: number) {
    // console.log('defaultChains', defaultChains)
    const chain = defaultChains.find((x: Chain) => x.id === networkId)!
    const chains = [chain] /* supported chains */
    return [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: { rpc: rpcUrl, qrcode: true },
      }),
      // new WalletLinkConnector({
      //   chains,
      //   options: {
      //     appName: document ? document.title : 'DApp',
      //     jsonRpcUrl: rpcUrl,
      //   },
      // }),
    ]
  }

  // const config = console.log('found NetworkId', networkId)

  const [openModalName, setOpenModalName] = useState<string | null>(null)

  return (
    <WalletModalOpenContext.Provider value={{ openModalName, setOpenModalName }}>
      {/* <WAGMIProvider autoConnect connectors={config.connectors}> */}
      <Web3ConfigurationContext.Provider
        value={{
          // networkId: networkId,
          // rpcUrl: rpcUrl,
          connectors: getConnectors(networkId),
          theme: Object.assign({}, Theme, theme),
          strings: Object.assign({}, Strings, strings),
        }}
      >
        <Fragment>
          <ConnectWalletModal />
          {children}
        </Fragment>
      </Web3ConfigurationContext.Provider>
      {/* </WAGMIProvider> */}
    </WalletModalOpenContext.Provider>
  )
}
