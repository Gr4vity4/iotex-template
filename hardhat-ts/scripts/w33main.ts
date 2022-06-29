const Web3 = require("web3")

// const web3 = new Web3("https://babel-api.mainnet.iotex.io")
const web3 = new Web3("https://babel-api.testnet.iotex.io")

// const transaction = {

async function run() {
    const newNonce = await web3.eth
        .getTransactionCount("0x54123b2309D456261410e51C10732033Ec885c21")
        .then(console.log)
    let transaction = {
        to: "0x556612d16993ed197e04bfccde1f665d1b788baf",
        gasLimit: 81000,
        from: "0x54123b2309D456261410e51C10732033Ec885c21",
        nonce: newNonce,
        type: 1,
        // chainId: 4689,
        data: "0xc47f0027000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000036161610000000000000000000000000000000000000000000000000000001234",
        // data: "0x68656c6c6f20776f726c6421",
    }
    const signedTx = await web3.eth.accounts.signTransaction(
        transaction,
        "",
        // "",
    )
    console.log("rawTx", signedTx)
    console.log(signedTx.rawTransaction)
    console.log(signedTx)
    // await web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
    await web3.eth
        .sendSignedTransaction(
            "080118c0843d220d313030303030303030303030306294010a01301229696f316d716c307265613473786c7678616634677138676573743438376e70706b73667a39707363381a646edb23df00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000327a0d38fa181a8a6db1c3b4a5f30866587cbe47fead65f0b728d3e78bfb0ae41750509602969eefe5d334c05baa21e147be96fce8699e8cf4aaa4c668c56d14800",
        )
        .then(console.log)
}

run()
