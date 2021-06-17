
const Web3 = require("web3");
const { Ocean, DataTokens } = require("@oceanprotocol/lib");
const fetch = require('cross-fetch')
const { testData } = require("./data");

const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const { config, contracts, urls } = require("./config");
const blob = `http://localhost:8030/api/v1/services/consume`;
const tokenAmount = '10000'

async function run(){
    try {
        const ocean = await Ocean.getInstance(config)
    const owner = (await ocean.accounts.list())[0]
    const alice = (await ocean.accounts.list())[1]

    const datatoken = new DataTokens(
        contracts.factoryAddress,
        factoryABI,
        datatokensABI,
        new Web3(urls.networkUrl)
      )
      const tokenAddress = await datatoken.create(blob, alice.getId());



      //   const tokenAddress = await datatoken.create(
    //     blob,
    //     alice.getId(),
    //     '10000000000',
    //     'AliceDT',
    //     'DTA'
    //   )
    const asset = {
        main: {
          type: 'dataset',
          name: 'test-dataset',
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
    price = '10' // in datatoken
    const publishedDate = new Date(Date.now()).toISOString().split('.')[0] + 'Z'
    const timeout = 0
    service1 = await ocean.assets.createAccessServiceAttributes(
      alice,
      price,
      publishedDate,
      timeout
    )
    const ddo = await ocean.assets.create(asset, alice, [service1], tokenAddress)
    console.log(ddo.dataToken, tokenAddress)
    const storeTx = await ocean.onChainMetadata.publish(ddo.id, ddo, alice.getId())
    console.log("storeTx", storeTx)

    await ocean.assets.resolve(ddo.id).then((newDDO) => {
        console.log(newDDO.id, ddo.id)
      })
    } catch (error) {
        console.log(error)
    }
}
run()