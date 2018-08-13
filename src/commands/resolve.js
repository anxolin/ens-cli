module.exports = ({ cli, web3, ens }) => {
  cli.command(
    'resolve <name>',
    'Resolve a ENS registry',
    yargs => {
      yargs.positional('name', {
        describe: 'ENS name',
        required: true
      })
    }, async function (argv) {
      let { name } = argv
      
      const address = await ens
        .resolver(name)
        .addr()
        .catch(error => {
          if (error.message === 'ENS name not found') {
            return 'N/A'
          } else {
            throw error
          }
        })

      console.log('\nResolve ENS Registry:')
      console.log('\tName: %s', name)
      console.log('\tValue: %s', address)
    })
}
