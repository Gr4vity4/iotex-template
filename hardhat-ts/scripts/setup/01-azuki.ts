import { BigNumber, Signer } from "ethers"
import { Azuki } from "../../typechain";
const hre = require("hardhat")
const { network, ethers } = require('hardhat');
async function main() {
    let accounts: Signer[] = await hre.ethers.getSigners()
    const { deployer } = await hre.getNamedAccounts()
    console.log('deployer: ', deployer)
    // const nftContract: Azuki = await hre.ethers.getContract("Azuki")
    // console.log('nftContract', nftContract)

    const nftContract = await hre.ethers.getContract("Azuki")
}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
} else {
    module.exports = main
}


