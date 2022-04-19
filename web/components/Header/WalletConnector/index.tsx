import { useWeb3React } from '@web3-react/core'
import ButtonGradient from 'components/Button/Gradient'
// import { supportedWallets } from 'configs'
// import { avaxMainnet } from 'consts/network/avax-mainnet'
// import { useEagerConnect, useInactiveListener } from 'hooks/useWallet'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
// import { walletConnectorModalState, walletConnectorState, web3ReactState } from 'states'
import WalletInfo from './WalletInfo'
import WalletSelector from './WalletSelector'

declare let window: any

export default function WalletConnector() {
  const { active, activate } = useWeb3React()

  // const { account, chainId, chainIdHex } = useRecoilValue(web3ReactState)
  // const [walletConnector, setWalletConnector] = useRecoilState(walletConnectorState)
  // const [isShowWalletSelectorModal, showWalletSelectorModal] = useRecoilState(walletConnectorModalState)

  // useEffect(() => {
  //   async function switchNetwork() {
  //     if (!window.ethereum) return
  //     const activeChainId = await window.ethereum.request({ method: 'eth_chainId' })
  //     if (!(activeChainId && parseInt(activeChainId, 16) === chainId)) {
  //       await window.ethereum.request({
  //         method: 'wallet_addEthereumChain',
  //         params: [
  //           {
  //             chainId: avaxMainnet.chainIdHex,
  //             chainName: avaxMainnet.chainName,
  //             nativeCurrency: avaxMainnet.nativeCurrency,
  //             rpcUrls: avaxMainnet.rpcUrls,
  //             blockExplorerUrls: avaxMainnet.blockExplorerUrls,
  //           },
  //         ],
  //       })
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: chainIdHex }],
  //       })
  //     }
  //   }
  //   switchNetwork()
  // }, [chainId, chainIdHex])

  // const triedEager = useEagerConnect()
  // useInactiveListener(!triedEager)
  // useEffect(() => {
  //   async function connectWallet() {
  //     if (triedEager && !active && !isShowWalletSelectorModal) {
  //       const supportedWallet = Object.values(supportedWallets).find((w) => w.name === walletConnector)
  //       if (supportedWallet && supportedWallet.connector) {
  //         try {
  //           await activate(supportedWallet.connector)
  //           setWalletConnector(supportedWallet.name)
  //         } catch (error) {}
  //       }
  //     }
  //   }
  //   connectWallet()
  // }, [triedEager, active, activate, isShowWalletSelectorModal, setWalletConnector, walletConnector])

  return (
    <>
      {false ? (
        // <WalletInfo account={account} onClick={() => showWalletSelectorModal(true)} />
        (<>Hello</>)
      ) : (
        <div className="mr-14 md:mr-0">
          <ButtonGradient
            text="Connect Wallet"
            iconPosition="left"
            icon={
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.2162 14.3333C16.2162 14.0681 16.3187 13.8138 16.5012 13.6262C16.6837 13.4387 16.9311 13.3333 17.1892 13.3333H19.7838C20.0418 13.3333 20.2893 13.4387 20.4718 13.6262C20.6542 13.8138 20.7568 14.0681 20.7568 14.3333C20.7568 14.5985 20.6542 14.8529 20.4718 15.0404C20.2893 15.228 20.0418 15.3333 19.7838 15.3333H17.1892C16.9311 15.3333 16.6837 15.228 16.5012 15.0404C16.3187 14.8529 16.2162 14.5985 16.2162 14.3333ZM0 2.66667H0.0181621C0.0979369 1.93332 0.43789 1.25591 0.973028 0.763962C1.50817 0.272009 2.20095 2.22941e-05 2.91892 0H17.8378C18.2212 0 18.6007 0.0775973 18.9549 0.228361C19.309 0.379126 19.6308 0.600104 19.9018 0.87868C20.1729 1.15726 20.3879 1.48797 20.5346 1.85195C20.6813 2.21593 20.7568 2.60603 20.7568 3V4.116C21.6802 4.34135 22.5027 4.88025 23.0913 5.64556C23.6798 6.41087 24 7.35784 24 8.33333V19.6667C24 20.8159 23.5558 21.9181 22.7651 22.7308C21.9744 23.5435 20.902 24 19.7838 24H4.21622C3.09801 24 2.02559 23.5435 1.2349 22.7308C0.444207 21.9181 0 20.8159 0 19.6667V2.66667ZM19.7838 6H1.94595V19.6667C1.94595 20.9547 2.96303 22 4.21622 22H19.7838C20.3859 22 20.9633 21.7542 21.3891 21.3166C21.8149 20.879 22.0541 20.2855 22.0541 19.6667V8.33333C22.0541 7.7145 21.8149 7.121 21.3891 6.68342C20.9633 6.24583 20.3859 6 19.7838 6ZM18.8108 4V3C18.8108 2.73478 18.7083 2.48043 18.5258 2.29289C18.3434 2.10536 18.0959 2 17.8378 2H2.91892C2.66087 2 2.41339 2.10536 2.23092 2.29289C2.04845 2.48043 1.94595 2.73478 1.94595 3C1.94595 3.26522 2.04845 3.51957 2.23092 3.70711C2.41339 3.89464 2.66087 4 2.91892 4H18.8108Z"
                  fill="#1F2937"
                />
              </svg>
            }
            className="px-4 py-2.5 text-sm transition duration-200 rounded-full shadow-sm bg-lime-default text-dark-400 hover:bg-lime-400 active:bg-lime-500 "
            onClick={() => false /* showWalletSelectorModal(true) */}
          />
        </div>
      )}
      {/* {isShowWalletSelectorModal && (
        <WalletSelector isOpen={isShowWalletSelectorModal} onClose={() => showWalletSelectorModal(false)} />
      )} */}
    </>
  )
}
