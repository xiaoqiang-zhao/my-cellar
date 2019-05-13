#!/usr/bin/env node

const program = require('commander');
// console.log('demo1');

program
  // 固定参数 version
  .version(require('../package').version, '-v, --version')
  // 布尔值，注意缩写只能是一个字母
  .option('-b, --key-name-boolean', '参数说明')
  // 获取输入，如果谢了参数需要赋值
  .option('-s, --key-name-string <>', '参数说明')
  // 获取输入，可变参数，如果赋值了就提取字符串，如果只写参数就返回 true
  .option('-m, --key-name-must []', '参数说明')

  .command('rm <dir>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
    // console.log('------');
  });

// console.log('keyNameBoolean', program.keyNameBoolean);
// console.log('keyNameString', program.keyNameString);
// console.log('keyNameMust', program.keyNameMust);

// 此行一定要单独写
program.parse(process.argv)