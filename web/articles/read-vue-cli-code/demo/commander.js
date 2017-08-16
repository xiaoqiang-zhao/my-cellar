#!/usr/bin/env node

var program = require('commander');  
  
function range (val) {
    return val.split('..').map(Number);  
}  
  
function list (val) {  
    return val.split(',')  
}
  
//定义参数,以及参数内容的描述  
program  
    .version('0.0.1')  
    .usage('[options] [value ...]')  
    .option('-m, --message <string>', 'a string argument')  
    .option('-i, --integer <n>', 'input a integet argument.', parseInt)  
    .option('-f, --float <f>', 'input a float arg', parseFloat)  
    .option('-l, --list <items>', 'a list', list)  
    .option('-r, --range <a>..<b>', 'a range', range)  
  
//添加额外的文档描述  
program.on('help', function() {  
    console.log('   Examples:')  
    console.log('')  
    console.log('       # input string, integer and float')  
    console.log('       $ ./nodecmd.js -m \"a string\" -i 1 -f 1.01')  
    console.log('')  
     
    console.log('       # input range 1 - 3')  
    console.log('       $ ./nodecmd.js -r 1..3')  
    console.log('')  
     
    console.log('       # input list: [1,2,3]')  
    console.log('       $ ./nodecmd.js -l 1,2,3')  
    console.log('')  
});  
  
//解析commandline arguments  
program.parse(process.argv)  
  
//输出结果  
console.info('--messsage:')  
console.log(program.message);  
  
console.info('--integer:')  
console.log(program.integer)  
  
console.info('--range:')  
console.log(program.range)  
  
console.info('--list:')  
console.log(program.list)  

// commander -m aa -i 11 -f 2.3 -l dd -r 4..5 ff