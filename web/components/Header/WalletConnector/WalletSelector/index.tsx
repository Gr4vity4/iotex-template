import { useWeb3React } from '@web3-react/core'
import useLogger from 'hooks/useLogger'
import { useEffect } from 'react'
import Modal from 'react-modal'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function WalletSelector({ isOpen, onClose }: Props) {
  const { activate } = useWeb3React()

  const { error } = useLogger()
  async function connectWallet(connector: any) {
    try {
      await activate(connector)
      onClose()
    } catch (err) {
      error(err)
    }
  }

  useEffect(() => {
    Modal.setAppElement('body')
  }, [])

  return (
    <Modal
      closeTimeoutMS={200}
      className="absolute w-10/12 overflow-y-hidden transform -translate-x-1/2 -translate-y-1/2 rounded-2.5xl top-1/2 left-1/2 lg:max-w-lg focus:outline-none"
      overlayClassName="fixed inset-0 z-50 bg-dark-400 bg-opacity-80"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="px-4 py-4 pb-8 md:px-6 focus:outline-none">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="mr-2 font-bold text-gray-900 md:text-lg font-ubuntu">Select a Wallet</h2>
          <div
            className="cursor-pointer p-2.5 leading-none rounded-lg hover:bg-dark-400 text-gray-900"
            onClick={onClose}
          >
            <i className="text-gray-900 material-icons">close</i>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 rounded md:grid-cols-1 content-evenly">
          <ul className="flex flex-col gap-4">
            {/* {Object.values(supportedWallets).map((w) => (
              <WalletItem key={w.name} text={w.name} icon={w.icon} onClick={() => connectWallet(w.connector)} />
            ))} */}
          </ul>
          <p className="text-xs text-gray-900">Connect to your wallet and continue</p>
        </div>
      </div>
    </Modal>
  )
}
