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
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};