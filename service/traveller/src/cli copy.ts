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
    this.provider = new JsonRpcProvider({ url: networks[networkId] });
    // console.log(this.provider.connection)
  }
  public async catchUp() {
    let from = this.blockHeight || 12656640; // TODO: read blockHeight from DB
    const last = await this.provider.getBlockNumber();

    // console.log("???")
    // console.info(`catchUp start at: ${from} ${last}`);

    from++;

    // note: you have to install this dependency manually since it's not required by cli-progress
    // const colors = require('ansi-colors');

    // // create new progress bar
    // const b1 = new cliProgress.SingleBar({
    //     format: 'CLI Progress |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
    //     barCompleteChar: '\u2588',
    //     barIncompleteChar: '\u2591',
    //     hideCursor: true
    // });

    // // initialize the bar - defining payload token "speed" with the default value "N/A"
    // b1.start(last, 146566400, {
    //   speed: 1
    // });
    const multiBar = new cliProgress.MultiBar(
      {
        clearOnComplete: false,
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

      // if (tx.type == 0) {
      //   // console.log(tx.data.length)
      //   // if (tx.data.length > 2 && tx.value.gt(0) && tx.to == '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045') {
      //   if (tx.data.length >2 && tx.value.gt(0) && isValidUTF8(Buffer.from(tx.data.slice(2), 'hex'))) {
      //     const str = Buffer.from(tx.data.slice(2), 'hex').toString('utf8');
      //     if (str.length > 1)
      //       console.log(`${fromBlock}, valid:`, str);
      //     // console.log(`block ${this.scanBlocks}`, Buffer.from(tx.data.slice(2), 'hex').toString())
      //     // console.log(tx)
      //     // console.log(tx.data)
      //   }
      // }
      // continue

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
            // logger.info(`block: ${fromBlock}`)
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

const e = new Engine(1);
e.catchUp();
