/**
 * Created by zhaoxiaoqiang on 16/8/25.
 */

function getComponentTypeList() {
    // pages是一个全局变量
    var pages = window.pages || [];
    var componentTypeList = [];
    pages.forEach(function (components) {
        f(components);
    });

    function f(components) {
        components.forEach(function (item) {
            if (componentTypeList.indexOf(item.type) === -1) {
                componentTypeList.push(item.type);
            }
            if (Array.isArray(item.fields)) {
                f(item.fields);
            }
        });
    }

    return componentTypeList;
}