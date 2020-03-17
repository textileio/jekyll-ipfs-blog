const execa = require('execa')

console.log(`EXECUTING: textile bucket push public/ jekyll-ipfs-blog`)

try {
  const { stdout } = execa.command(
    'textile bucket push _site/ jekyll-ipfs-blog --debug',
    {
      input: '\n',
    },
  )
  stdout.pipe(process.stdout)
} catch (error) {
  console.log('ERROR: ', error)
}