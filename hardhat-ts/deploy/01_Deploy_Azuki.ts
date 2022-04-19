import { network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
const hre1 = require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat")
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre as any
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    // const AzukiContract = await ethers.getContractFactory("Azuki");
    // const Azuki = await AzukiContract.deploy();
    // await Azuki.deployed();

    const args: any[] = []
    const CONTRACT_NAME = 'Azuki'
    await deploy(CONTRACT_NAME, {
        contract: CONTRACT_NAME,
        from: deployer,
        args,
        log: true,
    })


    const deployedContract = await ethers.getContract(CONTRACT_NAME)

    // console.log(`npx `)
    console.log()
    console.log()
    console.log()
    console.log(
        `npx hardhat verify --contract contracts/${CONTRACT_NAME}.sol:${CONTRACT_NAME} ${deployedContract.address
        } ${args.map(arg => `"${arg}"`).join(" ")} --network ${network.name} `,
    )

    console.log()

}
export default func
func.tags = ["Azuki"]

