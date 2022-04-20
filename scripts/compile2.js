const path = require('path');
const fs = require('fs');
const solc = require('solc');
// Compile contract
const contractPath = path.resolve(__dirname, 'Presale.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
    language: 'Solidity',
    sources: {
        'Presale.sol': {
            content: source,
        },
    },
    settings: {
        optimizer: {
            enabled: true,
            // Optimize for how many times you intend to run the code.
            // Lower values will optimize more for initial deployment cost, higher values will optimize more for high-frequency usage.
            runs: 200
        },
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(tempFile);
console.log("compilation parse-----------------");

const contractFile = tempFile.contracts['Presale.sol']['SafuTrendzPresale'];

// console.log(contractFile);
// console.log("contract compiled---------------");

module.exports = contractFile;