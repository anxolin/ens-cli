#!/usr/bin/env node
const assert = require('assert')
const yargs = require('yargs')

if (process.env.NODE_ENV !== 'production') {
  // Load env vars
  require('dotenv').load();
}

const MNEMONIC = process.env.MNEMONIC
assert(MNEMONIC, 'MNEMONIC is required')

async function run () {
  const cli = yargs.usage('$0 <cmd> [args]')
  const commandParams = { cli }

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
  }
}


run()
  .catch(console.error)