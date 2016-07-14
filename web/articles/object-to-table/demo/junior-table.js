/**
 * Created by zhaoxiaoqiang on 16/7/6.
 */
var juniorDataHead = [
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
var juniorData = [
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
var juniorTableContainer = document.getElementById('junior-table');
var html = objectToTable(juniorData, juniorDataHead);
juniorTableContainer.innerHTML = html;