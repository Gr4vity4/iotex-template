import { JsonRpcProvider } from '@ethersproject/providers'
import { ERC721, ERC721__factory } from '../types/ethers-contracts'
import { providers } from './utils'

async function main() {
  const network = 1
  const provider = new JsonRpcProvider({ url: providers[network] })
  const contract: ERC721 = ERC721__factory.connect('0x035e362e5d1f8c41ec882b37500d4e8632381d41', provider)
  const deployedBlockNumber = 14446496
  const latestBlockNumber = await provider.getBlockNumber()

  const toBlock = latestBlockNumber
  console.log(`fromBlock: ${deployedBlockNumber}, toBlock: ${toBlock}`)
  const allEvents = await provider.getLogs({
    fromBlock: deployedBlockNumber,
    toBlock: toBlock,
    address: contract.address,
  })
  const transferEvents = await contract.queryFilter(contract.filters.Transfer(), deployedBlockNumber, toBlock)

  console.log(`totalEvents: ${allEvents.length}, transferEvents: ${transferEvents.length}`)
  console.log('Minted', transferEvents.filter(e => e.args.from === '0x0000000000000000000000000000000000000000').length)
  console.log('Transferered', transferEvents.filter(e => e.args.from !== '0x0000000000000000000000000000000000000000'))
}

main()
