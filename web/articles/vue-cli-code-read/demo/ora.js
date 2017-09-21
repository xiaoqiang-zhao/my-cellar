#!/usr/bin/env node

const ora = require('ora');
 
const spinner = ora('Loading unicorns').start();
 
var arr = [
    () => {
        spinner.color = 'yellow';
        spinner.text = 'Loading rainbows';
    },
    () => {
        spinner.color = 'yellow';
        spinner.text = 'Loading rainbows';
    },
    () => {
        spinner.warn('warning text one');
        spinner.warn('warning text two');
    },
    () => {
        spinner.succeed();
    },
    () => {
        spinner.stop();
    }
]



function run() {
    setTimeout(() => {
        arr[index]();
        index += 1;
        if (index < arr.length) {
            run();
        }
    }, 1000);
}
var index = 0;
run();