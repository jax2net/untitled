const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    entry: './src/game.js',
    mode: 'development',
    target: 'web',
    output: {
        filename: 'app.build.js',
        path: path.resolve(__dirname, 'build'),
    },
};
