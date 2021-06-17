const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");
 
const urls = {
 networkUrl: "http://localhost:8545",
 aquarius: "http://localhost:5000",
 providerUri: "http://localhost:8030",
};
 
const contracts = {
    "DTFactory": "0xC4B0c99bBCb457d3a093753aCE6175AaDd3C2C59",
    "BFactory": "0xc335822E719dacE6f8915086f3474392ff2dB960",
    "FixedRateExchange": "0x3C674eCFd709410b0fc4c163abfEF0c38eAcCdc5",
    "Metadata": "0x96ed1Dfb6d5bC9991A4EA8C5Cd980B2695204F65",
    "Ocean": "0xC3559B42E57804eac5D733fC7C3422133da1a0fE",
    "Dispenser": "0xB2b539982c9FB911ceAe4E81989D4C057815F9e9"
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
