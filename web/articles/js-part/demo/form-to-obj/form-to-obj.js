/**
 * Created by 赵晓强 on 16/5/9.
 */
define(function () {

    function g(id) {
        return document.getElementById(id);
    }

    /**
     * 获取表单数据
     *
     * @param {string|Object} form 要读取的表单，只接受两种格式：form的id，form的原生dom节点
     * @param {boolean} isFilterEmpty 是否将空值（空字符串，没有选中项的组）从对象中过滤掉
     * @param {string|Object} noCheckedValue checkbox和radio组没有选中项时，为此字段赋默认值
     * @return {Object} formObj 获取到的数据对象
     * @public
     */
    function getFromData(form, isFilterEmpty, noCheckedValue) {
        if (typeof form === 'string') {
            form = g(form);
        }
        if (form && form.nodeType !== 1) {
            return '无法找到容器';
        }

        // 设置缺省值，因为传入的值可能是undefined所以通过参数组长度来设置缺省值
        if (arguments.length === 1) {
            noCheckedValue = null;
        }

        var formObj = {};
        var formCheckboxObj = {};
        var emptyArr = [];
        // 准备表单元素列表，根据键值特性分为两类
        var formEleArr = {
            single: emptyArr.concat(
                emptyArr.slice.call(form.getElementsByTagName('select')),
                emptyArr.slice.call(form.getElementsByTagName('textarea'))
            ),
            input: emptyArr.slice.call(form.getElementsByTagName('input'))
        };

        // 单键值元素
        formEleArr.single.forEach(function (ele) {
            single(ele, formObj, isFilterEmpty);
        });
        // input情况比较复杂
        formEleArr.input.forEach(function (ele) {
            var type = ele.type;

            // 一组一值
            if (type === 'radio') {
                radio(ele, formObj, noCheckedValue, isFilterEmpty);
            }
            // 一组多值
            else if (type === 'checkbox') {
                checkbox(ele, formCheckboxObj, noCheckedValue);
            }
            // 单键值处理，text,hidden,password
            else {
                single(ele, formObj, isFilterEmpty);
            }
        });

        // 将一组多值合并会单键值
        for (var name in formCheckboxObj) {
            if (formCheckboxObj[name].length > 0) {
                var checkboxVal = formCheckboxObj[name].join(',');
                if (isFilterEmpty === true) {
                    if (checkboxVal !== '') {
                        formObj[name] = checkboxVal;
                    }
                }
                else {
                    formObj[name] = checkboxVal;
                }
            }
            else {
                if (isFilterEmpty !== true) {
                    formObj[name] = noCheckedValue;
                }
            }
        }

        return formObj;
    }

    // 单键值处理
    function single(ele, formObj, isFilterEmpty) {
        var name = trim(ele.name);
        var val = trim(ele.value);
        if (name !== '') {
            if (isFilterEmpty === true) {
                if (val !== '') {
                    formObj[name] = ele.value;
                }
            }
            else {
                formObj[name] = val;
            }

        }
    }

    // 一组一值
    function radio(ele, formObj, noCheckedValue, isFilterEmpty) {
        var name = trim(ele.name);
        var val = trim(ele.value);
        if (name !== '') {
            if (ele.checked) {
                if (isFilterEmpty === true) {
                    if (val !== '') {
                        formObj[name] = val;
                    }
                }
                else {
                    formObj[name] = val;
                }
            }
            else if (isFilterEmpty !== true && formObj[name] === undefined) {
                formObj[name] = noCheckedValue;
            }
        }
    }

    // 一组多值
    function checkbox(ele, formCheckboxObj) {
        var name = trim(ele.name);
        var val = trim(ele.value);
        if (name !== '') {
            if (formCheckboxObj[name] === undefined) {
                formCheckboxObj[name] = [];
            }

            if (ele.checked) {
                formCheckboxObj[name].push(val);
            }
        }
    }

    function trim(str) {
        if (typeof str === 'string') {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
        else {
            return str;
        }
    }

    return getFromData;
});