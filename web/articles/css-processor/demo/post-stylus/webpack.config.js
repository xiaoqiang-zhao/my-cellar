var autoprefixer = require('autoprefixer');
var poststylus = require('poststylus');
// var poststylus = require('poststylus');
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
            //{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
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