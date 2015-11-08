var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        './src/main',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output:
    {
        path: '/dist',
        filename: 'bundle.js'
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
        },
        {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    devServer:
    {
        contentBase: './src'
    },
    debug: true
};
