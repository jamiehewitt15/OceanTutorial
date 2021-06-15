const Web3 = require("web3");
const { Ocean, DataTokens } = require("@oceanprotocol/lib");
 
const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const { config, contracts, urls } = require("./config");
 
 
 
const init = async () => {
 const ocean = await Ocean.getInstance(config);
 const blob = `http://localhost:8030/api/v1/services/consume`;
 
 const accounts = await ocean.accounts.list();
 const alice = accounts[0].id;
 console.log('Alice account address:', alice)
 
 const datatoken = new DataTokens(
   contracts.DTFactory,
   factoryABI,
   datatokensABI,
   new Web3(urls.networkUrl)
 );
 const tokenAddress = await datatoken.create(blob, alice);
 console.log(`Deployed datatoken address: ${tokenAddress}`);

 await datatoken.mint(tokenAddress, alice, '200', alice)
 let aliceBalance = await datatoken.balance(tokenAddress, alice)
 console.log('Alice token balance:', aliceBalance)
};
 
init();