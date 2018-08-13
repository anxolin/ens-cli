const assert = require('assert')

let web3, stopWeb3

module.exports = ({ url, mnemonic }) => {
  if (!web3) {
    assert(mnemonic, 'mnemonic is required')
    assert(url, 'url is required')
    const Web3 = require('web3')
    const HDWalletProvider = require('truffle-hdwallet-provider')

    console.log('Get web3 instance for: %s', url)
    var provider = new HDWalletProvider(mnemonic, url)
    
    stopWeb3 = () => web3.currentProvider.engine.stop()
    web3 = new Web3(provider)
  }

  return { web3, stopWeb3 }
}