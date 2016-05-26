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
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};