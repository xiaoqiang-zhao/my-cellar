/**
 * Created by zhaoxiaoqiang on 16/1/2.
 */
var a = require("./modules/a");
var b = require("./modules/b");

// 按需加载
setTimeout(function () {

    require.ensure(["./modules/c"], function(require) {
        require("./modules/b").xyz();
        var d = require("./modules/d");
        var b = require("./modules/b");
    }, 'hhhhhhh');  // 不可以使用变量
}, 5000);

// 此按需加载其实是 all in one 打包的一种改进版，并没有解决增量发布的问题。