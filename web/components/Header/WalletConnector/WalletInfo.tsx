type Props = {
  account: string
  onClick: () => void
}

const WalletInfo = ({ account, onClick }: Props) => {
  return (
    <>
      <div className="mr-14 md:mr-0">
        <button
          onClick={onClick}
          className="flex justify-end w-full px-3 py-2 rounded-full md:px-5 md:py-3 md:my-0 md:justify-center "
        >
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
            <span className="flex items-center space-x-2 text-xs text-white truncate md:text-base">
              <span>
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <span className="material-icons">expand_more</span>
            </span>
          </span>
        </button>
      </div>
    </>
  )
}

export default WalletInfo
