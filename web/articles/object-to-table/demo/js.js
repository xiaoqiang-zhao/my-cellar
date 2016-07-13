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

    // 配置项初始化
    options = options || {};
    options.defaultWidth = options.defaultWidth || 130; // 默认值宽度

    // 包装表头配置数据
    tableHeadConfig = {
        key: 'root',
        children: tableHeadConfig
    };

    // 参数检验
    if (!Array.isArray(data)) {
        return '参数格式错误';
    }

    /**
     * 生成表格表头部分的 html 字符串 和 宽度
     *
     * @param {Array} tableHeadConfig 表头设置
     * @return {Object} result
     *                  {
     *                      html: string,  html字符串
     *                      widthSum: number 内层元素的宽度累加值
     *                   }
     */
    function getHeadHTML(tableHeadConfig) {
        var result = {
            html: '',
            widthSum: 0
        };
        var styleClass;
        var widthSum = 0;

        var functionSelf = arguments.callee;
        var style;

        // 有子项
        if (Array.isArray(tableHeadConfig.children)) {
            var _html = '';
            tableHeadConfig.children.forEach(function (item) {
                var _result = functionSelf(item);
                _html += _result.html;
                widthSum += _result.widthSum;
                item.width = _result.widthSum;
            });
            if (tableHeadConfig.key === 'root') {
                styleClass = 'thead row';
                style = {
                    'flex': '0 0 ' + widthSum + 'px'
                };
            }
            else {
                styleClass = 'column';
                var columnItemStyle = {
                    'flex': '1',
                    'width': widthSum + 'px'
                };
                var summaryTitleHtml = joinHTML(
                    'row leaf',
                    columnItemStyle,
                    tableHeadConfig.title
                );
                var containerHtml = joinHTML(
                    'row',
                    columnItemStyle,
                    _html
                );
                style = {
                    'flex': '1 0 auto',
                    'width': widthSum + 'px'
                };
                _html = summaryTitleHtml + containerHtml;
            }
        }
        // 叶子节点直接展示
        else {
            styleClass = 'row padding leaf';
            widthSum = tableHeadConfig.width || options.defaultWidth;
            _html = tableHeadConfig.title;
            style = {
                'flex': '0 0 ' + widthSum + 'px'
            };
        }

        tableHeadConfig.width = result.widthSum;
        result.widthSum = widthSum;
        result.html = joinHTML(styleClass, style, _html);

        return result;
    }

    /**
     * 生成表格主体部分的 html 字符串
     *
     * @param {Array} data 数据
     * @param {Object} head 表头设置
     * @param {Object} options 上一级传给下一级的配置信息
     *
     * @return {Object} result
     *                  {
     *                      html: string,  html字符串
     *                      widthSum: number 内层元素的宽度累加值
     *                   }
     */
    function getBodyHTML(data, head, options) {
        var result;

        var functionSelf = arguments.callee;
        var styleClass;
        var style = {
                'flex': '0 0 ' + head.width + 'px'
            };
        var html = '';
        var _head;
        // 将数组一行行展示
        if (Array.isArray(data)) {

            // 如果当前数组没有元素，为了在 dom 上占位还需要生成一个空标签
            if (data.length === 0) {
                data = [''];
            }
            data.forEach(function (item) {
                html += functionSelf(item, head, {
                    isArrayChild: true
                });
            });
            // 如果当前数组没有元素，为了在 dom 上占位还需要生成一个空标签
            // 这种写法更具扩展性，但是代码不如上面简介，本着欧姆剃刀原则这里使用上面一种
            // 如果有需要扩展，可以切换到下面这种写法
            //if (html === '') {
            //    html += functionSelf('', head, {
            //        isArrayChild: true,
            //        isEmpty: true
            //    });
            //}

            if (head.key === 'root') {
                styleClass = 'tbody';
            }
            else {
                styleClass = 'column';
            }
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
                        html += functionSelf(item, _head);
                    }
                }
            }
            styleClass = 'row';
        }
        // 数据叶子节点直接展示
        else {
            styleClass = 'row padding leaf';
            html = data.toString();
            if (options && options.isArrayChild) {
                style = {
                    'flex': '1 0 auto',
                    'width': head.width + 'px'
                };
            }
        }
        result = joinHTML(
            styleClass,
            style,
            html
        );
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

    /**
     * 拼接 html，生成一个独立内容的 div
     *
     * @param {string} styleClass 样式的 class 字符串
     * @param {Object} style 内敛样式键值对
     * @param {string} innerHTML 标签内的 html 字符串
     *
     * @return {string} html 生成的 html
     */
    function joinHTML(styleClass, style, innerHTML) {
        var html = '';
        var styleStr = '';

        if (!styleClass) {
            styleClass = '';
        }

        for (var key in style) {
            if (style.hasOwnProperty(key)) {
                styleStr += key + ':' + style[key] + '; ';
            }
        }

        html += ''
            + '<div class="' + styleClass + '" style="' + styleStr + '">'
            + innerHTML
            + '</div>';

        return html;
    }

    var tableHead = getHeadHTML(tableHeadConfig);
    var tableBody = getBodyHTML(data, tableHeadConfig);
    var html = joinHTML(
        'object-table',
        {
            width: tableHead.widthSum + 'px',
        },
        tableHead.html + tableBody
    );

    return html;
}
