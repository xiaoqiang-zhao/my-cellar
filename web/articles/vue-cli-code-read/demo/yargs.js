#!/usr/bin/env node
var y = require('yargs')
  .options({
    'run': {
      alias: 'r',
      describe: 'run your program'
    },
    'path': {
      alias: 'p',
      describe: 'provide a path to file'
    },
    'spec': {
      alias: 's',
      default: 123,
      describe: 'program specifications'
    }
  })
  // 无值布尔参数
  .boolean(['x','y','z'])
  .epilog('copyright 2015')
  // .help()
  .argv

console.log(`run:${y.run}, path:${y.path}, spec:${y.spec}, x:${y.x}`)

// yargs --run aa -p bb -s 456