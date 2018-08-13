module.exports = ({ cli }) => {
  cli.command(
    'resolve',
    'Resolve a ENS registry',
    yargs => {
      yargs.positional('name', {
        describe: 'ENS name',
        required: true
      })
    }, async function (argv) {
      let { name } = argv
      console.log('\nResolve ENS Registry:')
      console.log('\tName: %s', name)
      console.log('\tValue: %s', 1234)      
    })
}
