const Web3 = require("web3");
const { Ocean, DataTokens } = require("@oceanprotocol/lib");
const { testData } = require("./data");waitForAqua
const { waitForAqua } = require("./util");

const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const { config, contracts, urls } = require("./config");
const tokenAmount = '10000'

 
 
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
 const tokenAddress = await datatoken.create(
    blob, 
    alice.getId(),
    '10000000000',
    'AliceDT',
    'DTA');
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
  const ddo = await ocean.assets.create(
    testData,
    alice,
    [dataService],
    tokenAddress
  );
  const storeTx = await ocean.onChainMetadata.publish(ddo.id, ddo, alice.getId())
    console.log("storeTx", storeTx)
    await waitForAqua(ocean, ddo.id)
    // await new Promise(r => setTimeout(r, 95000)); 

    await ocean.assets.resolve(ddo.id).then((newDDO) => {
      console.log("Resolve", newDDO.id, ddo.id)
    })
  
  const dataId = ddo.id;
  console.log('Data ID:', dataId);

  // Create Pool pricing for the dataset
  price = '10' // in datatoken
  const publishedDate = new Date(Date.now()).toISOString().split('.')[0] + 'Z'
  const timeout = 0
  service1 = await ocean.assets.createAccessServiceAttributes(
    alice,
    price,
    publishedDate,
    timeout
  )

  const dtAmount = '45'
  const dtWeight = '9'
  const oceanAmount = (parseFloat(dtAmount) * (10 - parseFloat(dtWeight))) / parseFloat(dtWeight)
  const fee = '0.02'

  const createTx = await ocean.pool.create(
      alice.getId(),
      tokenAddress,
      dtAmount,
      dtWeight,
      String(oceanAmount),
      fee
    )

  const alicePoolAddress = createTx.events.BPoolRegistered.returnValues[0]
  console.log("Pool address:", alicePoolAddress)

  const transaction = await datatoken.transfer(tokenAddress, bob.getId(), '50', alice.getId())
  const transactionId = transaction['transactionHash']
  console.log('transactionId', transactionId)

  let bobBalance = await datatoken.balance(tokenAddress, bob.getId())
  aliceBalance = await datatoken.balance(tokenAddress, alice.getId())

  console.log('Alice token balance:', aliceBalance)
  console.log('Bob token balance:', bobBalance)
  
  const accessService = await ocean.assets.getServiceByType(asset.id, 'access')
  const bobTransaction = await ocean.assets.order(asset.id, 'access', bob.getId())

const data = await ocean.assets.download(
  ddo.id,
  bobTransaction,
  tokenAddress,
  bob,
  './datafiles'
)

bobBalance = await datatoken.balance(tokenAddress, bob.getId())
console.log("Bob token balance:", bobBalance)
};
 
init();