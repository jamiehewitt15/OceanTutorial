const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");
 
const urls = {
 networkUrl: "http://localhost:8545",
 aquarius: "http://localhost:5000",
 providerUri: "http://localhost:8030",
};
 
const contracts = {
    "DTFactory": "0x6F8D287a2898d7A2aff723CaD4D56aD9E94CB405",
    "BFactory": "0xB7BA5d9a934e4b6c581af7bC76bf2cd274f5B7be",
    "FixedRateExchange": "0x49f0960444aA0D4B35b578095aCC21Fc0678472E",
    "Metadata": "0xC5eBD196C507f62a2F4271271E57B2F7aBD7cE82",
    "Ocean": "0x970cE99E03d799F42db329baf74A8863d5D8380b",
    "Dispenser": "0x2576C2348Be1333d4f78046607c93eFd26fE92E1"
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
