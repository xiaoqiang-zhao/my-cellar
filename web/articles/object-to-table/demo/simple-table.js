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
        title: 'b-标题名'
        //children: [
        //    {
        //        key: 'b1',
        //        text: 'b1-展示名',
        //        width: 100,
        //        isWrap: true
        //    }
        //]
    }
];
var simpleData = [
    {
        a: 'AAA1',
        b: [
            'B1-1',
            'B1-2'
        ],
        c: 'CCC'
    },
    {
        a: 'AAA2',
        b: [
            '多文字折行测试'
        ],
        c: 'CCC'
    },
    {
        a: 'AAA3',
        b: [
            'B1-1',
            'Talk is cheap. Show me the code'
        ],
        c: 'show me your code'
    }
];
var simpleTableContainer = document.getElementById('simple-table');
var html = objectToTable(simpleData, simpleDataHead);
simpleTableContainer.innerHTML = html;