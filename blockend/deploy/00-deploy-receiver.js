const { verify } = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat-config")
const { ethers } = require("hardhat")

const deployReceiver= async function (hre) {
    console.log("we here?")
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    log("Deploying Receiver and waiting for confirmations...")
    const receiver = await deploy("Receiver", {
        from: deployer,
        log: true,
        waitConfirmations: developmentChains.includes(network.name) ? 1 : 5,
    })
    log(`Receiver at ${receiver.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(receiver.address, [1000])
    }
}

module.exports = deployReceiver 
deployReceiver.tags = ["all", "receiver"]
