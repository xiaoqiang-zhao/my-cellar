var libPath = __dirname + '/';
// 根路径
rootPath = libPath.replace('tool/', '') + 'web/';
module.exports = {
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
        UglifyJsPlugin: true,
        warnings: false
    },
    compress: {
        warnings: false
    },
    // devtool: 'sourcemap',
    output: {
        path: rootPath + '/dist/',
        publicPath: '/js/',
        filename: 'debug.js'
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
