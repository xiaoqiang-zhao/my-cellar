var autoprefixer = require('autoprefixer');
var poststylus = require('poststylus');
var stylus = require('stylus');

// 怎么用，文档里没写...
//stylus(css).use([
//    poststylus([
//        autoprefixer({ browsers: ['ie 9'] })
//    ])
//]);

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
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    },
    stylus: {
        use: [
            //poststylus([
            //    autoprefixer({ browsers: ['ie 8'] }),
            //    'rucksack-css'
            //])
            poststylus([ 'autoprefixer', 'rucksack-css' ])
        ]
    }
};