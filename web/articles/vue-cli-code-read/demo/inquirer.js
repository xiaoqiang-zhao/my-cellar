#!/usr/bin/env node

var inquirer = require('inquirer')

// confirm 判断
inquirer.prompt([
    {
        type: 'confirm',
        message: 'yes or no?',
        name: 'ok'
    },
    {
        type: 'list',
        message: 'list:',
        name: 'list',
        choices: [
            'a',
            'b',
            new inquirer.Separator(),
            'c',
            'd'
        ]
    },
    {
        type: 'rawlist',
        message: 'rawlist:',
        name: 'rawlist',
        choices: [
            '甲',
            '乙',
            '丙',
            '丁'
        ]
    },
    {
        type: 'checkbox',
        message: 'rawlist:',
        name: 'checkbox',
        choices: [
            '甲',
            '乙',
            '丙',
            '丁'
        ]
    },
    {
        type: 'input',
        message: 'input:',
        name: 'input'
    },
    {
        type: 'input',
        message: 'inputFilter:',
        name: 'inputFilter',
        filter(value) {
            return '===' + value + '==='
        }
    },
    {
        type: 'editor',
        message: 'editor:',
        name: 'editor',
        default: 'default'
    },
    {
        type: 'confirm',
        message: '是否设置密码?',
        name: 'isNeedPassword'
    },
    {
        type: 'password',
        message: 'password:',
        name: 'password',
        when(answers) {
            return answers.isNeedPassword
        },
        validate(value) {
            if (value.length < 7) {
                console.log('密码不能少于 7 位，请重新输入')
            }
            else {
                return true
            }
        }
    }
], function (answers) {
    // 这里可以拿到上面全部变量
})


