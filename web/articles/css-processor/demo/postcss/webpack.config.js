var precss       = require('precss');
var autoprefixer = require('autoprefixer');

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
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    }
};