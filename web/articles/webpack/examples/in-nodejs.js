/**
 * 可以在自己的 node 程序中自由调用 webpack
 *
 * Created by zhaoxiaoqiang on 16/1/2.
 */

var webpack = require("webpack");
function callback() {
    console.log('龙则 callback   ');
}
webpack({
    entry: {
        main: './js-module/a.js'
    },
    optimize: {
        // 是否压缩
        minimize: false
    },
    output: {
        path: './dist/',
        filename: '[hash].js'
    }
}, function (err, stats) {
    if (err) {
        throw new gutil.PluginError("webpack", err);
    }
    console.log('hash:' + stats.hash);
    callback();
});