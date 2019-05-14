#!/usr/bin/env node

const program = require('commander');

// Demo 1
program
  // 固定参数 version
  .version(require('../package').version, '-v, --version')
  .parse(process.argv);

// Demo 2
// program
//   // 布尔值，注意缩写只能是一个字母
//   .option('-b, --boolean-input', '参数说明')
//   // 值必填输入，如果写了参数需要赋值
//   .option('-r, --required-input <>', '参数说明')
//   // 值可选输入，如果赋值了就提取字符串，如果只写参数就返回 true
//   .option('-o, --optional-input []', '参数说明')
//   .parse(process.argv);

// console.log('booleanInput: ', program.booleanInput);
// console.log('requiredInput: ', program.requiredInput);
// console.log('optionalInput: ', program.optionalInput);

// Demo 3
// program
//   .option('-r, --range <>', '区间值，示例: 1..2', range)
//   .parse(process.argv);

// function range(val) {
//   return val.split('..').map(Number);
// }
// console.log(JSON.stringify(program.range));

// Demo 4
// program
//   .command('rm <dir>')
//   .option('-r, --required-input <>', '参数说明')
//   .action(function (dir, option) {
//     console.log(`remove ${dir}, requiredInput: ${option.requiredInput}`);
//   });

// program
//   .command('mk <dir>')
//   .option('-o, --optional-input <>', '参数说明')
//   .action(function (dir, option) {
//     console.log(`make ${dir}, optionalInput: ${option.optionalInput}`);
//   });

// // 此行一定要单独写
// program.parse(process.argv);
