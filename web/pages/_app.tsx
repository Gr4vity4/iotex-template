import Footer from 'components/Footer'
import Header from 'components/Header'
import Main from 'components/Main'
import Root from 'components/Root'
import { Web3ConfigProvider } from 'libs/simple-wallet-provider-main/src'
import { AppProps } from 'next/app'
import 'styles/global.css'
import { Provider as WAGMIProvider } from 'wagmi'
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

  return (
    <Root>
      <WAGMIProvider autoConnect /*connectors={config.connectors}*/>
        <Web3ConfigProvider rpcUrl={undefined} networkId={1}>
          <Header />
          <Main component={Component} pageProps={pageProps} />
          {/* <Toast /> */}
          <Footer />
        </Web3ConfigProvider>
      </WAGMIProvider>
    </Root>
  )
}

export default MyApp
