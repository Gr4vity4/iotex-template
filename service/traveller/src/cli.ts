import { JsonRpcProvider } from "@ethersproject/providers";
import { ERC721__factory, IERC165__factory } from "../types/ethers-contracts";
import { networks } from "./utils";

const cliProgress = require("cli-progress");
const isValidUTF8 = require("utf-8-validate");

const fs = require("fs");
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

class Engine {
  private blockHeight: number = 0;
  private provider: JsonRpcProvider;
  private bar1: any;

  constructor(networkId: number) {
    console.log("network id", networkId);
    console.log(networks[networkId]);
    this.provider = new JsonRpcProvider({ url: networks[networkId] });
    // console.log(this.provider.connection)
  }
  public async catchUp() {
    let from = this.blockHeight || 15024260; // TODO: read blockHeight from DB
    const last = await this.provider.getBlockNumber();

    from++;

    const multiBar = new cliProgress.MultiBar(
      {
        clearOnComplete: false,
        fps: 60,
        hideCursor: true,
      },
      cliProgress.Presets.shades_classic
    );

    this.bar1 = multiBar.create(last, from);

    while (from < last) {
      const diff = 0;
      const to = Math.min(from + diff, last);
      this.bar1.update(from);
      await this.scanBlocks(from, to);
      from = to + 1;
    }
  }
  private async scanBlocks(fromBlock: number, toBlock: number) {
    // console.log('scanBlocks', fromBlock, toBlock, 'diff=', toBlock - fromBlock);
    // console.log('result', await this.provider.getBlockWithTransactions(fromBlock))
    // console.log('resugetBlocklt', await this.provider.getBlock(fromBlock))
    const txs = await this.provider.getBlockWithTransactions(fromBlock);
    for (const tx of txs.transactions) {
      const txAny: any = tx;

      if (txAny.creates) {
        const contract = IERC165__factory.connect(txAny.creates, this.provider);
        const ERC1155Interface = "0xd9b67a26";
        const ERC721Interface = "0x80ac58cd";
        const ERC721Enumerable = "0x780e9d63";
        try {
          if (await contract.supportsInterface(ERC721Interface)) {
            const isErc721 = await ERC721__factory.connect(
              txAny.creates,
              this.provider
            );
            const str = `> block: ${fromBlock}, ${txAny.creates} is ERC721, ${
              ((await contract.supportsInterface(ERC721Enumerable)) &&
                "ERC721Enumerable") ||
              ""
            }`;
            logger.info(str);
          } else if (await contract.supportsInterface(ERC1155Interface)) {
            const str = `> block: ${fromBlock}, ${txAny.creates} is ERC1155`;
            logger.info(str);
          } else {
            // console.log('>', txAny.creates, 'isUnknown')
          }
        } catch (e) {
          // console.log(e)
        }
      }
    }
    // console.log(`block: ${fromBlock} tx count: ${txs.transactions.length}`)
  }
}

const e = new Engine(4690);
e.catchUp();
