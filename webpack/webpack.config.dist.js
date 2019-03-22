const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.js'),  //入口文件 index.js
    target: 'electron-renderer',
    output: {
        path: path.resolve(__dirname, '../preBuild/dist'),  //输出路径
        filename: 'bundle-[hash].js'  //输出文件名
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(css|scss)$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] }) },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1&name=images/[hash:8].[name].[ext]' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.dist.html'),
            title: 'AwesomeApp',
            filename: 'index.html',
            inject: true
        }),
        new ExtractTextPlugin('style-[hash].css'),
        new webpack.DefinePlugin({
            APP_MODE: JSON.stringify('PRODUCTION'),
            PROXY_URL: JSON.stringify('http://39.105.174.177:3002/')
        })
    ]
}
