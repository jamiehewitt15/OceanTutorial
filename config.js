const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");
 
const urls = {
 networkUrl: "http://localhost:8545",
 aquarius: "http://localhost:5000",
 providerUri: "http://localhost:8030",
};
 
const contracts = {
    "DTFactory": "0xF18Fc0D2B31cc0Ead0a66AFa22133f8637be6B62",
    "BFactory": "0xf8F6300500A7297DE52570A99982e5e73685420d",
    "FixedRateExchange": "0xBAD914fE2b693Fc540C8E0B6C8cD39a164068aB6",
    "Metadata": "0xAE0A420c97748d0FCD894D9d7AF2effaD4a92be5",
    "Ocean": "0xb0075Ec7153FC91E8c05084c74B8324abB6C62A5",
    "Dispenser": "0x3BB5A0647117d7d6816023Cd3331a3D75b319112"
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
