/**
 * Created by zhaoxiaoqiang on 16/8/26.
 */
var result = {};
var componentType = 'shop-rele-input';
// 循环页面
function forPage(pages) {
    pages.forEach(function (components) {
        forComponents(components);
    });

    return result;
}


// 循环组件
function forComponents(components) {
    components.forEach(function (item) {
        // 只针对一个组件
        if (item.type === componentType) {
            findDifference(item, result);
        }
        // complex 和 dynamic-add 的子组件扫描
        else if (item.type === 'shop-complex' || item.type === 'shop-dynamic-add') {
            forComponents(item.fields, result);
        }
    });
}

function findDifference(componentConfig, resultPart) {
    for (var key in componentConfig) {
        if (resultPart[key] === undefined) {
            resultPart[key] = componentConfig[key];
        }
        // 下钻
        else if (Object.prototype.toString.call(componentConfig[key]) === '[object Object]') {
            findDifference(componentConfig[key], resultPart[key]);
        }
    }
}
var pages = []; // 通过 js 引入老页面的配置文件
var componentConfig = forPage(pages);
console.log(JSON.stringify(componentConfig));