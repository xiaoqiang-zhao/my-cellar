#!/usr/bin/env node

const inquirer = require('inquirer')

const genList = (list) => {
    const choices = list.map((item, index) => {
        return {
            key: index,
            name: `${item.id}: ${item.quantity} @${item.price}`,
            value: item.id
        }
    }) 
    return {
        type: 'rawlist',
        message: '(带序号的单选)Which order to pick',
        name: 'orders',
        choices: choices
    }
}

const getList = () => {
    return Promise.resolve([
        {
            id: 'A001',
            quantity: 20,
            price: 103
        },
        {
            id: 'A002',
            quantity: 75,
            price: 2.03
        },
        {
            id: 'A003',
            quantity: 16,
            price: 900.01
        }
    ])
}

const getTypeList = () => {
    return {
        type: 'list',
        message: '(不带序号的单选)Which type to pick',
        name: 'types',
        choices: [
            {
                key: 1,
                name: 'B001',
                value: 110
            },
            {
                key: 2,
                name: 'B002',
                value: 120
            },
            {
                key: 3,
                name: 'B003',
                value: 130
            }
        ]
    }
}

const getExpandList = () => {
    return {
        type: 'expand',
        message: '(折叠式的单选)Which type to pick',
        name: 'expands',
        choices: [
            {
                key: 'a',
                name: 'C001',
                value: 110
            },
            {
                key: 'b',
                name: 'C002',
                value: 120
            },
            {
                key: 'c',
                name: 'C003',
                value: 130
            }
        ]
    }
}

const getEditor = () => {
    return {
        type: 'editor',
        name: 'bio',
        message: '(多行输入)Please write a short bio of at least 3 lines.',
        validate: function(text) {
            if (text.split('\n').length < 3) {
                return 'Must be at least 3 lines.';
            }
    
            return true;
        }
    }
}

const confirmUpdate = (id) => {
    return {
        type: 'confirm',
        name: 'toUpdate',
        message: `(是否选择)Would you like to update ${id}?`
    }
}

async function main() {
    // 任意文本输入
    const getAccount = await inquirer.prompt({
        type: 'input',
        name: 'account',
        message: '(文本输入)What is the account?'
    })
    // 数字输入
    const getNumber = await inquirer.prompt({
        type: 'number',
        name: 'number',
        message: '(数字输入)What is the number?'
    })
    // 不带序号的单选
    const type = await inquirer.prompt(getTypeList());
    // 带序号的输入
    const orderList = await getList()
    const getOrder = await inquirer.prompt(genList(orderList))
    // 带快捷方式的选中
    const expandIndex = await inquirer.prompt(getExpandList())
    // 多行输入
    const editorValue = await inquirer.prompt(getEditor())
    console.log(editorValue)

    const getConfirm = await inquirer.prompt(confirmUpdate(getOrder.orders))

    if(getConfirm.toUpdate) {
        console.log('to update', getOrder.orders, 'for account', getAccount.account)
    } else {
        console.log('NOT to update', getOrder.orders)
    }
}

main();
