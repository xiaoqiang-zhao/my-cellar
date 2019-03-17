/**
 * @file 模拟数据示例
 *
 * @author longze
 */

// http://mockjs.com/examples.html
const mock = require('mockjs')

module.exports = function (param) {
  return {
    status: 0,
    statusInfo: '',
    data: {
      text: '服务器端 mock 数据',
      picUrl: mock.Random.image('200x100', '#4A7BF7', 'Mock image')
    }
  }
}
