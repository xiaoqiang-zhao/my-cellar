module.exports = {
    entry: {
        main: './a.js'
    },

    output: {
        path: './dist/',        // 将生成的文件放到此路径下
        publicPath: './dist/',  // 异步加载的模块的请求路径，默认是 webpack.config.js 所在的路径
        filename: 'main.js'
    }
};
