var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist', 'js');
var mainPath = path.resolve(__dirname, 'src', 'main.js');

var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    output:
    {
        path: buildPath,
        filename: 'bundle.min.js'
    },
    module:
    {
        loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query:
            {
                presets: ['es2015']
            },
            exclude: [nodeModulesPath]
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css?sourceMap", "sass?sourceMap"]
        },{
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }]
    }
};

module.exports = config;
