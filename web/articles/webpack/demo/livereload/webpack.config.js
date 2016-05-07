var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: {
        main: './a.js'
    },

    output: {
        path: './dist/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },

    plugins: [
        // //172.24.26.33:9999
        new LiveReloadPlugin({
            port: '9999',
            host: '172.24.26.33',
            appendScriptTag: true
        })
    ]
};