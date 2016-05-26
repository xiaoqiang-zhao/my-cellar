module.exports = {
    entry: {
        main: './a.js'
    },

    output: {
        path: './dist/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.tpl$/,
                loader: 'html-loader'
            }
        ]
    }
};