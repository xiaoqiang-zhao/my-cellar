#!/usr/bin/env node

const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const ora = require('ora');

console.log(`日志${chalk.green('高亮')}输出: log output ${chalk.yellow('hight light')}`);

const space = 1000;
let time = space;
setTimeout(() => {
    console.log(chalk.green('✔') + ' 带图标的输出: 成功');
}, time += space);

setTimeout(() => {
    console.log(chalk.red('✘') + ' 带图标的输出: 失败');
}, time += space);

setTimeout(() => {
    console.log(chalk.red('🔥') + ' 带图标的输出: 火');
}, time += space);

const spinner = new Spinner(chalk.green('%s ') + '使用 spinner 自定义执行中');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇');

setTimeout(() => {
    spinner.start();
}, time += space);

setTimeout(() => {
    spinner.stop(true);
    console.log(chalk.green('✔') + ' 执行成功');
}, time += space);

const spinnerOra = ora('使用 ora 库表示执行中');
spinnerOra.color = 'yellow';

setTimeout(() => {
    spinnerOra.start();
}, time += space);

setTimeout(() => {
    // 可以动态修改文本
    spinnerOra.text = '可以动态修改文本...';
}, time += space);

setTimeout(() => {
    spinnerOra.succeed('执行成功');
}, time += space);

setTimeout(() => {
    console.log(`
    ${chalk.green('------------------------------')}
        注意动画只能有一个在动
    ${chalk.green('------------------------------')}
    `);
}, time += space);
