/**
 * @file 检查 node 版本是否满足最低版本要求
 */
import chalk from 'chalk'
import packageConfig from './package.json'

function check (done) {
  // Parse version number from strings such as 'v4.2.0' or `>=4.0.0'
  function parseVersionNumber (versionString) {
    return parseFloat(versionString.replace(/[^\d\.]/g, ''))
  }

  // Ensure minimum supported node version is used
  var minNodeVersion = parseVersionNumber(packageConfig.engines.node)
  var currentNodeVersion = parseVersionNumber(process.version)
  if (minNodeVersion > currentNodeVersion) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + minNodeVersion + '.x to use'
    ))
  }

  done()
}

export default check
