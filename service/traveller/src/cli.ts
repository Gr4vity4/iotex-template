import { JsonRpcProvider } from '@ethersproject/providers'
import { ERC721, ERC721__factory } from '../types/ethers-contracts'
import { providers } from './utils'

async function main() {
  const network = 4
  const provider = new JsonRpcProvider({ url: providers[network] })
  const contract: ERC721 = ERC721__factory.connect('0xCc9260CA4f41D04db0cfd9529a406607E9988EC5', provider)
  console.log(contract)
}

main()
