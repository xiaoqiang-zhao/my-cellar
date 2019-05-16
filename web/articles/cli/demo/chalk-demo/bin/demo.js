#!/usr/bin/env node

const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

console.log(chalk.green('✔') + ' 1/3 执行成功');
console.log(chalk.green('✔') + ' 2/3 执行成功');
console.log(chalk.green('✔') + ' 3/3 执行成功');
console.log(chalk.red('✖') + ' 执行失败');
console.log(chalk.red('✘') + ' 执行失败');
console.log(chalk.red('🔥') + ' 执行失败');

const spinner = new Spinner(chalk.yellow('%s ') + 'processing.. ');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇');
spinner.start();

setTimeout(() => {
    spinner.stop(true);
    console.log(chalk.green('✔') + ' 执行成功');
}, 5000);