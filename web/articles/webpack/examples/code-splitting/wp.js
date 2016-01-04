/**
 * Created by zhaoxiaoqiang on 16/1/2.
 */

// http://webpack.github.io/docs/optimization.html
var webpack = require("webpack");
function callback() {
    console.log('code splitting success.');
}
webpack({
    entry: {
        main: './enter.js'
    },
    optimize: {
        // 是否压缩
        minimize: false
    },
    output: {
        path: './dist/',
        publicPath: './dist/',
        filename: '[name].js'
    }
}, function (err, stats) {
    if (err) {
        throw new gutil.PluginError("webpack", err);
    }
    console.log('hash:' + stats.hash);
    console.log(stats);
    callback();
});