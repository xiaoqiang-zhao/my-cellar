/**
 * Created by zhaoxiaoqiang on 16/1/21.
 */
var webpack = require('webpack');
var libPath = __dirname + '/';
// 根路径
rootPath = libPath.replace('tool/', '') + 'web/';
var config = {
    entry: {
        main: rootPath + 'src/components/main/main.js'
    },

    resolve: {
        alias: {
            vue: rootPath + 'src/dep/vue.js'
        }
    },
    optimize: {
        // 是否压缩
        UglifyJsPlugin: true
    },
    // devtool: 'sourcemap',
    output: {
        path: rootPath + '/dist/',
        publicPath: '/js/',
        filename: '[hash].js'

    },

    module: {
        loaders: [
            {
                test: /\.tpl$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            }
        ]
    }
};
webpack(config, function (err, stats) {
    if (err) {
        throw new gutil.PluginError("webpack", err);
    }
    console.log('finished');
});
// module.exports