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
  module.exports = { waitForAqua };