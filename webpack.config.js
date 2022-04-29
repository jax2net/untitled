const path = require('path');

module.exports = {
    entry: './src/game.js',
    mode: 'development',
    output: {
        filename: 'app.build.js',
        path: path.resolve(__dirname, 'build'),
    },
};
