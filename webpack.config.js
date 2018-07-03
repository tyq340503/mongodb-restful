const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        'index': './index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bumdle.js',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ],
        loader: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['reset', 'es2015']
                },
            }
        ],
    },
}