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

    /**
     * 生成表格主体部分的 html 字符串
     *
     * @param {Array} data 数据
     * @param {Object} head 表头设置
     *
     * @return {Object} result
     *                  {
     *                      html: string,  html字符串
     *                      widthSum: number 内层元素的宽度累加值
     *                   }
     */
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
            var styleClass = '';
            if (head.key === 'root') {
                styleClass = 'tbody';
            }
            result.html +=joinHTML(
                styleClass,
                {
                    'width': result.widthSum + 'px'
                },
                _html
            );
            //result.html += '<div class="' + styleClass +'" style="width:' + result.widthSum + 'px;">';
            //result.html += _html;
            //result.html += '</div>';
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
            result.html +=joinHTML(
                'row',
                {
                    'min-width': result.widthSum + 'px'
                },
                _html
            );
            //result.html += '<div class="row" style="width:' + result.widthSum + 'px;">';
            //result.html += _html;
            //result.html += '</div>';
        }
        // 数据叶子节点直接展示
        else {
            // 默认值宽度
            var defaultWidth = 130;

            //if (_head) {
                head.width = head.width || defaultWidth;
                result.html +=joinHTML(
                    'row padding leaf',
                    {
                        'min-width': head.width + 'px'
                    },
                    data.toString()
                );
                result.isLeaf = true; // 是否是叶子节点
                result.widthSum = head.width;
            //}
        }
        return result;
    }

    /**
     * 获取字段对应的表头设置
     *
     * @param {string} key 字段键值
     * @param {Object} head 当前字段上一级的表头设置，
     *                      可以从此参数的的children属性中找到表头设置
     *
     * @return {Object} result 表头设置对象(未找到设置返回 null)
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

    function joinHTML(styleClass, style, innerHTML) {
        var html = '';
        var styleStr = '';
        for(var key in style) {
            if(style.hasOwnProperty(key)) {
                styleStr += key + ':' + style[key] + '; ';
            }
        }
        html += '<div class="' + styleClass + '" style="' + styleStr + '">';
        html += innerHTML;
        html += '</div>';
        return html;
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
                b1: 'B1-2',
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