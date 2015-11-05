var path = require('path')
var webpack = require('webpack')


module.exports = {
    entry: [
        './src/main'
    ],
    output:
    {
        path: 'dist',
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
        }]
    },
    devServer:
    {
        contentBase: './src'
    },
    debug: true
};
