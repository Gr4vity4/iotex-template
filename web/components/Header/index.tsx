import { ConnectButton } from '@rainbow-me/rainbowkit'
import Navigation from 'components/Navigation'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Header() {
  const { asPath } = useRouter()
  const CustomConnectButton = () => {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  )
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={openChainModal} style={{ display: 'flex', alignItems: 'center' }} type="button">
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance ? ` (${account.displayBalance})` : ''}
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    )
  }

  return (
    <div>
      <header className="relative flex justify-between w-full px-10 py-6 border-b">
        <div className="flex items-center gap-4 space-x-0 md:space-x-10">
          <Link href="/">
            <a className="text-2xl">Fermented Blockchain</a>
          </Link>
        </div>
        <Navigation />
        {/* <WalletConnector /> */}
        {asPath.replace('#/', '').replace('#', '') === '/' ? null : (
          <button
            id="hamburger"
            type="button"
            className="absolute right-0 px-3 py-2 text-gray-400 rounded-md top-8 md:hidden"
            aria-expanded="false"
            onClick={() => true /*setShowMenu(true) */}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 6H20M4 12H20M4 18H11"
                stroke="#C6DC37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </header>
      <div>
        <div className="flex items-center justify-between px-8 py-2 border-b">
          <div className="flex items-center gap-2">
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 2v11.82l9-5.94L4 2zm1.5 2.82l4.81 3.06L5.5 11V4.82z"></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.928 7.976l4.357 4.357-.618.62L5 8.284v-.618L9.667 3l.618.619-4.357 4.357z"
                ></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
                ></path>
              </svg>
            </button>
            <button aria-expanded="false" type="button">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1 8.05-9.12A8.251 8.251 0 1 0 15.25.01V0zm0 15a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z"></path>
              </svg>
            </button>
            {/* <button aria-expanded="false" type="button">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5 2H13V1h-1v1H4V1H3v1H1.5l-.5.5v12l.5.5h13l.5-.5v-12l-.5-.5zM14 14H2V5h12v9zm0-10H2V3h12v1zM4 8H3v1h1V8zm-1 2h1v1H3v-1zm1 2H3v1h1v-1zm2-4h1v1H6V8zm1 2H6v1h1v-1zm-1 2h1v1H6v-1zm1-6H6v1h1V6zm2 2h1v1H9V8zm1 2H9v1h1v-1zm-1 2h1v1H9v-1zm1-6H9v1h1V6zm2 2h1v1h-1V8zm1 2h-1v1h1v-1zm-1-4h1v1h-1V6z"
                ></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.558 2.642a3.698 3.698 0 0 0-.123-.01A1.47 1.47 0 0 0 3.999 1.52v1.307a4.898 4.898 0 0 0-2.993 3.587v.39c.459.836 1.906 1.13 2.154 1.18.027.006.04.009.035.009-2.419.32-2.19 2.249-2.19 2.249a1 1 0 0 0 1 .93c.272-.019.538-.08.79-.18h2.06a3 3 0 0 0-.36 1h-.32a2.55 2.55 0 0 0-2.17 2.528.42.42 0 0 0 .39.48h6.677a3.76 3.76 0 0 0 3.929-4.158 3.649 3.649 0 0 0-.75-2.09l-.11-.14c-.43-.55-.68-.909-.55-1.289.13-.38.365-.4.365-.4s.185-.03.455.09c.22.128.46.22.71.27a1.58 1.58 0 0 0 1.736-.905c.095-.208.143-.435.143-.664.006-.718-.33-1.455-.725-2.088a4.998 4.998 0 0 0-1.554-1.57 3.998 3.998 0 0 0-2.639-.4 3.049 3.049 0 0 0-1.67.89 3.56 3.56 0 0 0-.779 1.359 4.358 4.358 0 0 0-.636-.747v-.159A1.47 1.47 0 0 0 5.558 1.52v1.122zm5.304 8.739c.111.741.22 1.821-.867 2.442-.296.103-.608.16-.923.167H3.215a1 1 0 0 1 .92-1h1.279v-.499a1.79 1.79 0 0 1 1.653-1.825l-.626-.887c-.236.067-.463.153-.577.233H2.655a.754.754 0 0 0-.264.07c-.138.055-.274.109-.396.03-.2-.13.11-1.12 1.01-1.12h1c.49 0 .57-.54.57-.54l.28-1.129a3.389 3.389 0 0 1-2.85-.93 3.389 3.389 0 0 1 3.14-2.658l.083.002c.26.008.435.014.776.168.93.42 2.149 2.469 2.149 2.469l.06.09h.17v-.07c-.06-.443-.02-1.464.116-1.89.137-.424.367-.814.673-1.14a2.349 2.349 0 0 1 1.3-.659 2.639 2.639 0 0 1 1.86.29c.46.284.85.67 1.139 1.127.289.457.476.836.535 1.374-.001.02 0 .047.002.081.007.143.02.39-.128.547-.127.135-.448.23-.67.18a1.57 1.57 0 0 1-.45-.18 1.33 1.33 0 0 0-1.139-.13 1.42 1.42 0 0 0-.94 1 2.318 2.318 0 0 0 .64 2.238l.11.14c.347.434.546.966.57 1.52a2.999 2.999 0 0 1-.306 1.425 2.708 2.708 0 0 0-.464-1.304l-.37.368zM4.24 5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z"
                ></path>
              </svg>
            </button> */}
          </div>
          <div>
            <div>
              <CustomConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
