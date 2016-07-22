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

    // 参数检验
    if (!Array.isArray(data)) {
        return '参数格式错误';
    }

    // 配置项初始化
    options = options || {};
    // 默认值宽度
    options.defaultWidth = options.defaultWidth || 130;
    // 占位空值
    options.emptyPlaceholder = options.emptyPlaceholder || '-';

    // 包装表头配置数据，为了统一的处理逻辑和对根节点的特殊处理
    tableHeadConfig = {
        key: '$root',
        children: tableHeadConfig
    };
    data = {
        '$root': data
    };

    /**
     * 生成表格表头部分的 html 字符串 和 宽度
     *
     * @param {Array} tableHeadConfig 表头设置
     * @return {Object} result
     *                  {
     *                      html: string,  html字符串
     *                      width: number 内层元素的宽度
     *                   }
     */
    function getHeadHTML(tableHeadConfig) {
        var result = {
            html: '',
            width: 0
        };
        var styleClass;
        var width = 0;

        var functionSelf = arguments.callee;
        var style;

        // 有子项
        if (Array.isArray(tableHeadConfig.children)) {
            var _html = '';
            tableHeadConfig.children.forEach(function (item) {
                var _result = functionSelf(item);
                _html += _result.html;
                width += _result.width;
                item.width = _result.width;
            });
            if (tableHeadConfig.key === '$root') {
                styleClass = 'thead row';
                style = {
                    'flex': '0 0 ' + width + 'px'
                };
            }
            else {
                styleClass = 'column';
                var columnItemStyle = {
                    'flex': '1 0 auto',
                    'width': width + 'px'
                };
                var summaryTitleHtml = joinHTML(
                    'leaf',
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
                    'width': width + 'px'
                };
                _html = summaryTitleHtml + containerHtml;
            }
        }
        // 叶子节点直接展示
        else {
            styleClass = 'leaf';
            width = tableHeadConfig.width || options.defaultWidth;
            _html = tableHeadConfig.title;
            style = {
                'flex': '0 0 ' + width + 'px'
            };
        }

        tableHeadConfig.width = width;
        result.width = width;
        result.html = joinHTML(styleClass, style, _html);

        return result;
    }

    /**
     * 生成表格主体部分的 html 字符串
     *
     * @param {Object} head 表头设置
     * @param {Array} data 数据
     *
     * @return {string} html  html字符串
     */
    function getBodyHTML(head, data) {
        var html = '';
        var styleClass;
        var style;
        var functionSelf = arguments.callee;
        // 表头优先
        var dataValue = data === undefined ? options.emptyPlaceholder : data[head.key];

        // 数组型数据竖着排
        if (Array.isArray(dataValue)) {

            dataValue.forEach(function (item) {
                if (Array.isArray(head.children)) {
                    var _html = '';
                    head.children.forEach(function (headItem) {
                        // 递归 ...
                        _html += functionSelf(headItem, item);
                    });
                    // 为一行数据加容器
                    html += joinHTML(
                        'row',
                        {
                            flex: '1 0 auto',
                            width: head.width + 'px'
                        },
                        _html
                    );
                }
                // 叶子节点
                else {
                    html += joinHTML(
                        'leaf',
                        {
                            flex: '1 0 auto',
                            width: head.width + 'px'
                        },
                        item
                    );
                }
            });

            // 为表格主体加特殊样式识别，在逻辑上无用
            if (head.key === '$root') {
                styleClass = 'tbody column';
            }
            else {
                styleClass = 'column';
            }
            // 为空字段填充占位数据
            if (dataValue.length === 0) {
                styleClass += ' leaf';
            }
            style = {
                'flex': '1',
                'width': head.width + 'px'
            };
        }
        // 非数组类型横着排
        else {
            if (Array.isArray(head.children)) {
                styleClass = 'row';
                head.children.forEach(function (headItem) {
                    // 递归 ...
                    html += functionSelf(headItem, dataValue);
                });
            }
            // 叶子节点
            else {
                styleClass = 'leaf';
                html = dataValue === undefined ? options.emptyPlaceholder : dataValue;
            }
            style = {
                flex: '1 0 ' + head.width + 'px'
            };
        }

        html = joinHTML(
            styleClass,
            style,
            html
        );
        return html;
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
    var tableBody = getBodyHTML(tableHeadConfig, data);
    var html = joinHTML(
        'object-table',
        {
            width: tableHead.widthSum + 'px',
        },
        tableHead.html + tableBody
    );

    return html;
}
