import { connectorsForWallets, darkTheme, RainbowKitProvider, wallet } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Main from 'components/Main'
import Root from 'components/Root'
import { AppProps } from 'next/app'
import 'styles/global.css'
import { Chain, chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

function MyApp({ Component, pageProps }: AppProps) {
  // API key for Ethereum node
  // Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
  // const infuraId = process.env.INFURA_ID
  // Chains for connectors to support
  // const chains = defaultChains

  // Set up connectors
  // const connectors = ({ chainId }) => {
  //   // const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]
  //   return [
  //     new InjectedConnector({
  //       chains,
  //       options: { shimDisconnect: true },
  //     }),
  //     new WalletConnectConnector({
  //       options: {
  //         infuraId,
  //         qrcode: true,
  //       },
  //     }),
  //   ]
  // }
  const iotex: Chain = {
    id: 4689,
    name: 'IoTeX Network Mainnet',
    network: 'Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'IOTX',
      symbol: 'IOTX',
    },

    rpcUrls: {
      default: 'https://rpc.ankr.com/iotex',
    },

    blockExplorers: {
      default: { name: 'iotexscan', url: 'https://iotexscan.io' },
    },
    testnet: false,
  }
  const { chains, provider } = configureChains(
    [chain.optimism, iotex],
    [
      jsonRpcProvider({
        rpc: (chain) => {
          return { http: chain.rpcUrls.default }
        },
      }),
    ]
  )

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [wallet.metaMask({ chains })],
    },
  ])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <Root>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme()} chains={chains}>
          {/* <Web3ConfigProvider rpcUrl={undefined} networkId={1}> */}
          <Header />
          <Main component={Component} pageProps={pageProps} />
          {/* <Toast /> */}
          <Footer />
          {/* </Web3ConfigProvider> */}
        </RainbowKitProvider>
      </WagmiConfig>
    </Root>
  )
}

export default MyApp
