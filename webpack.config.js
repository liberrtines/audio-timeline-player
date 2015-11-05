var path = require('path')
var webpack = require('webpack')


module.exports = {
    entry: [
        './src/main',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output:
    {
        publicPath: '/',
        filename: 'main.js'
    },
    devtool: 'source-map',
    module:
    {
        loaders: [
        {
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            loader: 'babel-loader',
            query:
            {
                presets: ['es2015']
            }
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css?sourceMap", "sass?sourceMap"]
        }]
    },
    devServer:
    {
        contentBase: './src'
    },
    debug: true
};
