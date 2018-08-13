#!/usr/bin/env node
const assert = require('assert')
const yargs = require('yargs')
const getWeb3 = require('./util/getWeb3')
const getEns = require('./util/getEns')

const DEFAULT_NODE_URL = 'http://localhost:8545'

if (process.env.NODE_ENV !== 'production') {
  // Load env vars
  require('dotenv').load();
}

// Env vars
const mnemonic = process.env.MNEMONIC
const nodeUrl = process.env.NODE_URL

assert(mnemonic, 'MNEMONIC is required')

async function run () {
  const cli = yargs.usage('$0 <cmd> [args]')
  const { web3, stopWeb3 } = getWeb3({
    url: nodeUrl || DEFAULT_NODE_URL,
    mnemonic
  })
  const ens = getEns({
    web3Provider: web3.currentProvider
  })
  
  const commandParams = { cli, web3, ens }
  
  // Commands
  require('./commands/resolve')(commandParams)

  const argv = cli
    .help('h')
    .strict()
    // .showHelpOnFail(false, 'Specify --help for available options')
    .argv

  if (!argv._[0]) {
    cli.showHelp()
  } else {
    console.log('')
    stopWeb3()
  }
}


run()
  .catch(console.error)