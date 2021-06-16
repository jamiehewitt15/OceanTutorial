const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");
 
const urls = {
 networkUrl: "http://localhost:8545",
 aquarius: "http://localhost:5000",
 providerUri: "http://localhost:8030",
};
 
const contracts = {
    "DTFactory": "0x2cF17008e1d63782C8e4b4E2b9E74c03f6b1Fb8D",
    "BFactory": "0x1F27dfF20749D2B831553C82f9915b2651820259",
    "FixedRateExchange": "0x234A11923041B78a0856404481F4fb00232e1087",
    "Metadata": "0x405a9aB9Ff9e2C2E8F10cbB798A820Cf6979fFF7",
    "Ocean": "0xf5f8fAC24c1C74Da659D999691bF20a2580effb3",
    "Dispenser": "0xAe7CEF2A4712269556C4701ec070D5C5Afd875B1"
};
 
const config = {
 ...defaultConfig,
 metadataCacheUri: urls.aquarius,
 providerUri: urls.providerUri,
 web3Provider: new Web3(urls.networkUrl),
};
 
module.exports = {
 config,
 contracts,
 urls,
};
