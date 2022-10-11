import { JsonRpcProvider } from "@ethersproject/providers";
import { ERC721, ERC721__factory } from "../types/ethers-contracts";
import { networks } from "./utils";

async function main() {
  // stop the bar
  // b1.stop();
  const network = 1;
  const provider = new JsonRpcProvider({ url: networks[network] });
  const contract: ERC721 = ERC721__factory.connect(
    "0x035e362e5d1f8c41ec882b37500d4e8632381d41",
    provider
  );
  const deployedBlockNumber = 12446496;
  const latestBlockNumber = await provider.getBlockNumber();

  const toBlock = latestBlockNumber;
  console.log(`fromBlock: ${deployedBlockNumber}, toBlock: ${toBlock}`);
  // const allEvents = await provider.getLogs({
  //   fromBlock: deployedBlockNumber,
  //   toBlock: toBlock,
  //   address: contract.address,
  // })
  // const transferEvents = await contract.queryFilter(contract.filters.Transfer(), deployedBlockNumber, toBlock)

  // console.log(`totalEvents: ${allEvents.length}, transferEvents: ${transferEvents.length}`)
  // console.log('Minted', transferEvents.filter(e => e.args.from === '0x0000000000000000000000000000000000000000').length)
  // console.log('Transferered', transferEvents.filter(e => e.args.from !== '0x0000000000000000000000000000000000000000'))

  // provider.getTran

  // const tx = await provider.getTransactionReceipt('0xea50fa9b338b70eb393f074d83ab1b7b47467906a472782b7ac0e317739760ab')
  // console.log(tx)

  // const contractAddress = getContractAddress({
  //   from: '0x2aaccaf60b908207392cf488227a9c47a7096931',
  //   nonce: '0x0',
  // })

  // console.log("ContractAddress", contractAddress)
  // const tx = await provider.getTransaction('0x40eac2fee0e830243b5acdb2665656db8a84414cc9dfb095a8435d25386332c3')
  // const tx2:any = tx;
  // console.log(tx)
  // console.log(tx2.creates)

  // provider.getTransactionReceipt('0xea50fa9b338b70eb393f074d83ab1b7b47467906a472782b7ac0e317739760ab')
  // getContractAddress()

  // console.log(await provider.getBlockWithTransactions(14518735))
  const ERC1155Interface = "0xd9b67a26";
  const ERC721Interface = "0x80ac58cd";
  const ERC721Enumerable = "0x780e9d63";

  // const txs2 = await provider.getTransactionCount('vitalik.eth'))
  // const txRe = await provider.getTransaction('0x36dcb9f6b6f2d123c6a6011e444850e40a380605cf8bb68b86082beb296efb25')
  // const data = txRe.data.slice(2)
  // if (data.length > 0) {
  //   console.log(Buffer.from(data,'hex').toString())
  // }
  // console.log(await contract.supportsInterface(ERC721Interface))
  // console.log(await contract.supportsInterface(ERC721Enumerable))
  // console.log(await contract.supportsInterface(ERC1155Interface))

  //   console.logBytes4(bytes4(keccak256('balanceOf(address)')) ^
  //     bytes4(keccak256('setApprovalForAll(address,bool)')) ^
  //     bytes4(keccak256('isApprovedForAll(address,address)')) ^
  //     bytes4(keccak256('transferFrom(address,address,uint256)')) ^
  //     bytes4(keccak256('ownerOf(uint256)')) ^
  //     bytes4(keccak256('approve(address,uint256)')) ^
  //     bytes4(keccak256('getApproved(uint256)')) ^
  //     bytes4(keccak256('safeTransferFrom(address,address,uint256)')) ^
  //     bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)'))
  //  );
}

main();
