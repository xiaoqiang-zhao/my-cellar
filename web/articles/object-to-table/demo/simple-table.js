/**
 * Created by zhaoxiaoqiang on 16/7/6.
 */
var simpleDataHead = [
    {
        key: 'a',
        title: 'a-标题名'
    },
    {
        key: 'b',
        title: 'b-标题名',
        width: 100,
        children: [
            {
                key: 'b1',
                text: 'b1-展示名',
                width: 100,
                isWrap: true
            }
        ]
    },
    {
        key: 'c',
        title: 'c-标题名'
    }
];
var simpleData = [
    {
        // a: 'AAA',
        b: [
            {
                b1: 'B1-1',
                b1Name: 'name'
            },
            {
                b1: 'B1-2',
                b1Name: 'name'
            }
        ],
        c: 'CCC'
    },
    {
        // a: 'AAA',
        b: [
            {
                b1: '多文字折行测试',
                b1Name: 'name'
            }
        ],
        c: 'CCC'
    },
    {
        // a: 'AAA',
        b: [
            {
                b1: 'B1-1',
                b1Name: 'name'
            },
            {
                b1: 'show me your code',
                b1Name: 'name'
            }
        ],
        c: 'show me your code'
    }
];
var simpleTableContainer = document.getElementById('simple-table');
var html = objectToTable(simpleData, simpleDataHead);
simpleTableContainer.innerHTML = html;