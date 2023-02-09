import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/Layout'
import { connectorsForWallets, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { bsc, goerli, optimism } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import '@rainbow-me/rainbowkit/styles.css'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  // Configure chains
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
      default: { http: ['https://rpc.ankr.com/iotex'] },
      public: { http: ['https://rpc.ankr.com/iotex'] },
    },

    blockExplorers: {
      default: { name: 'iotexscan', url: 'https://iotexscan.io' },
    },
    testnet: false,
  }

  const { chains, provider } = configureChains(
    [optimism, goerli, bsc, iotex],
    [
      jsonRpcProvider({
        rpc: (chain) => {
          return { http: chain.rpcUrls.default.http[0] }
        },
      }),
    ]
  )

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet({ chains })],
    },
  ])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  return (
    <RecoilRoot>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider theme={darkTheme()} chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </MantineProvider>
    </RecoilRoot>
  )
}
