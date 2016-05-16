
module.exports = {
    entry: {
        main: './enter.js'
    },

    output: {
        path: './',
        filename: 'dist.js'
    },

    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    }
};