/**
 * Created by zhaoxiaoqiang on 16/6/9.
 */

/**
 * 讲一个对象装换成表格
 *
 * @param {Array} data 数据
 * @param {Array} tableHeadConfig 表头设置
 * @param {object} [options] 配置项[可选参数]
 *
 * @return {string} html 最后拼装完成 html
 */
function objectToTable(data, tableHeadConfig, options) {
    var html = '';
    tableHeadConfig = {
        key: 'root',
        children: tableHeadConfig
    };

    // 参数检验
    if (!Array.isArray(data)) {
        return '参数格式错误';
    }

    function getBodyHTML(data, head) {
        var result = {
            html: '',
            widthSum: 0
        };

        var functionSelf = arguments.callee;
        var _html = '';
        var _result;
        var _head;
        /** 拆分 **/
        // 将数组一行行展示
        if (Array.isArray(data)) {
            data.forEach(function (item) {
                _result = functionSelf(item, head);
                _html += _result.html;
            });
            result.widthSum = _result.widthSum;
            head.width = result.widthSum;
            var styleClass = 'column';
            if (head.key === 'root') {
                styleClass = 'tbody column';
            }
            result.html += '<div class="' + styleClass +'" style="width:' + result.widthSum + 'px;">';
            result.html += _html;
            result.html += '</div>';
        }
        // 将对象一列列展示
        else if (typeof data === 'object') {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var item = data[key];
                    // 找到对应字段
                    _head = getHead(key, head);
                    // 配置了表头，否则丢弃
                    if (_head) {
                        _result = functionSelf(item, _head);
                        _html += _result.html;
                        result.widthSum += _result.widthSum;
                        _head.width = _result.widthSum;
                    }
                }
            }

            result.html += '<div class="row" style="width:' + result.widthSum + 'px;">';
            result.html += _html;
            result.html += '</div>';
        }
        // 数据叶子节点直接展示
        else {
            // 默认值宽度
            var defaultWidth = 130;

            _head = getHead(key, head);
            head.width = head.width || defaultWidth;
            result.html += '<div class="row padding" style="width:' + head.width + 'px;">';
            result.html += data.toString();
            result.html += '</div>';
            result.isLeaf = true; // 是否是叶子节点
            result.widthSum = head.width;
        }
        //result.widthSum += 2;
        return result;
    }

    /**
     *
     * @param key
     * @param head
     *
     * @return {*}
     */
    function getHead(key, head) {
        var result = null;
        var children = head.children;
        if (head && Array.isArray(children)) {
            children.some(function (item) {
                if (key === item.key) {
                    result = item;
                    return true;
                }
            });
        }
        return result;
    }

    function getHeadHTML(tableHeadConfig) {
        var html = '';

        return html;
    }

    var tbody = getBodyHTML(data, tableHeadConfig);
    html = ''
        + '<div class="object-table">'
        + '    <div class="thead">'
        + '    </div>'
        + tbody.html
        + '</div>';

    return html;
}


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
                b1: 'B1',
                b1Name: 'name'
            },
            {
                b1: 'B1',
                b1Name: 'name'
            }
        ],
        c: 'CCC'
    },
    {
        // a: 'AAA',
        b: [
            {
                b1: 'B1',
                b1Name: 'name'
            },
            {
                b1: 'B1',
                b1Name: 'name'
            }
        ],
        c: 'CCC'
    }
];
var simpleData2 = [
    {
        a: 'AAA',
        c: 'CCC'
    }
];

var dom = document.getElementById('container');

var html = objectToTable(simpleData, simpleDataHead);
// var result = getHtml(complexData.data.poiInfo.poiInfo);
dom.innerHTML = html;