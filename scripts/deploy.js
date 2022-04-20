const Web3 = require('web3');

module.exports = (contractFile) =>{
    const bytecode = contractFile.evm.bytecode.object;
    const abi = contractFile.abi;
    const privKey = "77a575a339af28d19cef9a5a922a124b29adca0139fb7d1e4f71a784a4c4acf2";
    const address = "0xC240181D20D4b4124db6BEA1344d2C1Fa0574979";
    const ropstenUrl = 'https://ropsten.infura.io/v3/1aeac4a54ffc4cba91d13f02b8a4f1a6';
    const bscUrl = "https://apis.ankr.com/d73688f7c8e74d808335f3b2b0ab064c/07b448af3da9d046cbd9aa3d18a688e8/binance/full/test";
    const web3 = new Web3(bscUrl);

    const deploy = async() => {
        console.log('Attempting to deploy from account:', address);
        const tokenContract = new web3.eth.Contract(abi);

        console.log("contract ready--------------");

        const tokenTx = tokenContract.deploy({
            data: bytecode,
            arguments: ["MyToken","MTK",18,99000000,'0xD99D1c33F9fC3444f8101754aBC46c52416550D1']
        });

        console.log("Transaction ready--------------");

        const signedTransaction = await web3.eth.accounts.signTransaction({
                from: address,
                data: tokenTx.encodeABI(),
                gas: 4000000 //'4294967295',
            },
            privKey
        );

        console.log("Sign complete---------------");

        const createReceipt = await web3.eth.sendSignedTransaction(
            signedTransaction.rawTransaction
        );

        console.log('Contract deployed at address', createReceipt.contractAddress);
        
        return createReceipt.contractAddress;
    };
    deploy();
}


