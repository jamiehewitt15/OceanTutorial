const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");
 
const urls = {
 networkUrl: "http://localhost:8545",
 aquarius: "http://localhost:5000",
 providerUri: "http://localhost:8030",
};
 
const contracts = {
    "DTFactory": "0x6e790Bee7fa1d475F2490EB09744F339BA77c184",
    "BFactory": "0xd2B67970203B4fdd4080489f1Bc2E46A9900505a",
    "FixedRateExchange": "0x52B81C089847E33047935E40400136Ef1bCf565e",
    "Metadata": "0x63Ca6dB986B04897308C6D486148308C01Fff8FB",
    "Ocean": "0x258533652E1CAC57627009A963fB38dB68AFc81D",
    "Dispenser": "0xAc70FA6CD9bE2e78447bFb4E5dC982663C9C3a1D"
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
