const assert = require('assert')

let ens

module.exports = ({
  web3Provider,
  address
}) => {
  if (!ens) {
    assert(web3Provider, 'web3Provider is required')
    const Ens = require('ethereum-ens')
    
    ens = new Ens(web3Provider, address)
  }

  return ens
}