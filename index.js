const Web3 = require("web3");
const { Ocean, DataTokens, Account } = require("@oceanprotocol/lib");
const fetch = require('cross-fetch')
const { testData } = require("./data");
 
const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const { config, contracts, urls } = require("./config");
const tokenAmount = '10000'
const assetWithPool = {
    main: {
      type: 'dataset',
      name: 'test-dataset-with-pools',
      dateCreated: new Date(Date.now()).toISOString().split('.')[0] + 'Z', // remove milliseconds
      author: 'oceanprotocol-team',
      license: 'MIT',
      files: [
        {
          url: 'https://s3.amazonaws.com/testfiles.oceanprotocol.com/info.0.json',
          checksum: 'efb2c764274b745f5fc37f97c6b0e761',
          contentLength: '4535431',
          contentType: 'text/csv',
          encoding: 'UTF-8',
          compression: 'zip'
        }
      ]
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async function waitForAqua(ocean, did) {
    const apiPath = '/api/v1/aquarius/assets/ddo'
    let tries = 0
    do {
      try {
        const result = await fetch(ocean.metadataCache.url + apiPath + '/' + did)
        if (result.ok) {
          break
        }
      } catch (e) {
        // do nothing
      }
      await sleep(1500)
      tries++
    } while (tries < 100)
  }
 
const init = async () => {

 const ocean = await Ocean.getInstance(config);
 const blob = `http://localhost:8030/api/v1/services/consume`;
 const owner = (await ocean.accounts.list())[0]
 const alice = (await ocean.accounts.list())[1]
 const bob = (await ocean.accounts.list())[2]
 
 console.log('Alice account address:', alice.getId())
 
 const datatoken = new DataTokens(
   contracts.DTFactory,
   factoryABI,
   datatokensABI,
   new Web3(urls.networkUrl)
 );
 const tokenAddress = await datatoken.create(blob, alice.getId());
 console.log(`Deployed datatoken address: ${tokenAddress}`);

 await datatoken.mint(ocean.pool.oceanAddress, owner.getId(), tokenAmount)
 await datatoken.transfer(ocean.pool.oceanAddress, alice.getId(), '200', owner.getId())

 await datatoken.mint(tokenAddress, alice.getId(), '200', alice.getId())
 let aliceBalance = await datatoken.balance(tokenAddress, alice.getId())
 console.log('Alice token balance:', aliceBalance)

 dataService = await ocean.assets.createAccessServiceAttributes(
    alice,
    10, // set the price in datatoken
    new Date(Date.now()).toISOString().split(".")[0] + "Z", // publishedDate
    0 // timeout
  );
  
  // publish asset
  const createData = await ocean.assets.create(
    testData,
    alice,
    [dataService],
    tokenAddress
  );
  
  const dataId = createData.id;
  console.log('Data ID:', dataId);

  // Create Pool pricing for the dataset
  tokenAddressWithPool = await datatoken.create(
    blob,
    alice.getId(),
    '10000000000',
    'AliceDT',
    'DTA'
  )
  console.log("tokenAddressWithPool", tokenAddressWithPool)
  price = '10' // in datatoken
  const publishedDate = new Date(Date.now()).toISOString().split('.')[0] + 'Z'
  const timeout = 0
  service1 = await ocean.assets.createAccessServiceAttributes(
    alice,
    price,
    publishedDate,
    timeout
  )
  console.log("service1", service1)
  ddoWithPool = await ocean.assets.create(
    assetWithPool,
    alice,
    [service1],
    tokenAddressWithPool
  )
  console.log("ddoWithPool", ddoWithPool)
  
  await datatoken.mint(tokenAddressWithPool, alice.getId(), tokenAmount)
  aliceBalance = await datatoken.balance(contracts.Ocean, alice.getId())
  console.log('Alice Ocean balance:', aliceBalance)

  const dtAmount = '45'
  const dtWeight = '9'
  const oceanAmount =
    (parseFloat(dtAmount) * (10 - parseFloat(dtWeight))) / parseFloat(dtWeight)
  const fee = '0.02'
  console.log(        
    alice.getId(),
    tokenAddressWithPool,
    dtAmount,
    dtWeight,
    String(oceanAmount),
    fee)

    const createTx = await ocean.pool.create(
        alice.getId(),
        tokenAddressWithPool,
        dtAmount,
        dtWeight,
        String(oceanAmount),
        fee
      )
      //console.log("createTx:", createTx)

  const alicePoolAddress = createTx.events.BPoolRegistered.returnValues[0]
  console.log("Pool address:", alicePoolAddress)
  console.log("ddoWithPool.id", ddoWithPool.id)

  // await waitForAqua(ocean, ddoWithPool.id)

  const transaction = await datatoken.transfer(tokenAddress, bob.getId(), '50', alice.getId())
  const transactionId = transaction['transactionHash']
  console.log('transactionId', transactionId)

  let bobBalance = await datatoken.balance(tokenAddress, bob.getId())
  aliceBalance = await datatoken.balance(tokenAddress, alice.getId())

  console.log('Alice token balance:', aliceBalance)
  console.log('Bob token balance:', bobBalance)

};
 
init();