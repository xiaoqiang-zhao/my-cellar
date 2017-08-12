#!/usr/bin/env node

var program = require('commander')
var inquirer = require('inquirer')

// 定义参数
program
    .version('0.1.0')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')

// console.log('pineapple:' + program.pineapple);

// confirm 判断
inquirer.prompt([{
    type: 'confirm',
    message: 'ok?',
    name: 'ok'
}], function (answers) {
    if (answers.ok) {
        console.log('欧克');
    }
    else {
        console.log('不欧克');
    }
})