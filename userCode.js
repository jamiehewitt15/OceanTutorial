const Web3 = require("web3");
const { config, contracts, urls } = require("./config")
const { Ocean, DataTokens } = require("@oceanprotocol/lib");
const factory = require("@oceanprotocol/contracts/artifacts/DTFactory.json") ;
const datatokens = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json") ;
const { testData } = require("./data");

async function init(){
    const oceanInstance = await Ocean.getInstance(config);  
    const accounts = await oceanInstance.accounts.list();
    
    const alice = accounts[0];
    console.log("Alice account address:", alice.getId());
    
    const datatoken = new DataTokens(
        contracts.DTFactory,
        //@ts-ignore
        factory.abi,
         datatokens.abi,
         new Web3(urls.networkUrl)
    );
    
    const tokenAddress = await datatoken.create(urls.aquarius, alice.getId());
    console.log("tokenAddress", tokenAddress)
    await datatoken.mint(tokenAddress, alice.getId(), "200");
    let aliceBalance = await datatoken.balance(tokenAddress, alice.getId());
    console.log("Alice token balance:", aliceBalance);

    dataService = await oceanInstance.assets.createAccessServiceAttributes(
        alice,
        10, // set the price in datatoken
        new Date(Date.now()).toISOString().split(".")[0] + "Z", // publishedDate
        0 // timeout
      );
      
      // publish asset
      const ddo = await oceanInstance.assets.create(
        testData,
        alice,
        [dataService],
        tokenAddress
      );
      console.log("ddo ", ddo)
}

init()
