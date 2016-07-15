/**
 * Created by zhaoxiaoqiang on 16/7/6.
 */
var seniorDataHead = [
    {
        key: 'id',
        title: 'ID',
        width: 50
    },
    {
        key: 'shopName',
        title: '公司名称',
        width: 200
    },
    {
        key: 'plan',
        title: '装修方案',
        children: [
            {
                key: 'commonPlan',
                title: '平装方案',
                width: 230,
                isWrap: true
            },
            {
                key: 'exquisitePlan',
                title: '精装方案',
                width: 230,
                isWrap: true
            }
        ]
    },
    {
        key: 'phone',
        title: '联系电话',
        width: 200
    }
];
var seniorData = [
    {
        shopName: '咔咔咔装修公司',
        id: 1,
        plan: {
            exquisitePlan: [
                '欧洲红木奢华装',
                '智能家居前沿科技装'
            ],
            commonPlan: [
                '日式小清新',
                '简约现代'
            ]
        },
        phone: '12345678901'
    },
    {

    },
    {
        id: 3,
        shopName: '咔咔咔装修公司',
        plan: {
            exquisitePlan: [
                '欧洲红木奢华装',
                '智能家居前沿科技装'
            ],
            commonPlan: [
                '日式小清新',
                '浅色系简约现代',
                '简欧田园风'
            ]
        },
        phone: '12345678901'
    },
    {
        id: 4,
        shopName: '咔咔咔装修公司',
        plan: {
            exquisitePlan: [
                '欧洲红木奢华装',
                '智能家居前沿科技装'
            ],
            commonPlan: [
                '日式小清新',
                '浅色系简约现代，文字较多的展示方式',
                '简欧田园风'
            ]
        },
        phone: '12345678901'
    }
];
var seniorTableContainer = document.getElementById('senior-table');
var html = objectToTable(seniorData, seniorDataHead);
seniorTableContainer.innerHTML = html;