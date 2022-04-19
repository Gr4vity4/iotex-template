import { verifyMessage } from 'ethers/lib/utils'
import React from 'react'
import { useSignMessage } from 'wagmi'

export const SignMessage = () => {
  const previousMessage = React.useRef<string>()
  const [message, setMessage] = React.useState('')
  const [{ data, error, loading }, signMessage] = useSignMessage()

  const recoveredAddress = React.useMemo(() => {
    if (!data || !previousMessage.current) return undefined
    return verifyMessage(previousMessage.current, data)
  }, [data, previousMessage])

  return (
    <form
      onSubmit={(event) => {
        fetch('https://my-typescript-worker.laris.workers.dev/nonce').then(console.log)
        fetch('https://my-typescript-worker.laris.workers.dev/verify', {
          body: JSON.stringify({
            message: {
              domain: 'wagmi.sh',
              address: '0xf618A5B6B9f667B8a0C124b5ef8F72ed21B0bACc',
              statement: 'Sign in with Ethereum to the app.',
              uri: 'https://wagmi.sh',
              version: '1',
              chainId: 56,
              nonce: 'JwfSb2LAunr39DXdo',
              issuedAt: '2022-04-12T09:25:12.417Z',
            },
            signature:
              '0x1fef6b8968bd31adddf47c1957613f969329d8edd610051cf2496f278f6b9cb85ab8a1dc30569af9af5b8f9fa6c18270802ea70aba30eaf16e6063ab7c8491691c',
          }),
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => console.log)
          .catch(console.log)
        console.log('hello submit')
        event.preventDefault()
        previousMessage.current = message
        signMessage({ message })
      }}
    >
      <label htmlFor="message">Enter a message to sign</label>
      <textarea id="message" placeholder="The quick brown fox…" onChange={(event) => setMessage(event.target.value)} />
      <button disabled={loading || !message.length}>{loading ? 'Check Wallet' : 'Sign Message'}</button>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress}</div>
          <div>Signature: {data}</div>
        </div>
      )}
      {error && <div>{error?.message ?? 'Error signing message'}</div>}
    </form>
  )
}
