const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),  //入口文件 index.js
    output: {
        path: path.resolve(__dirname, '../dist'),  //输出路径
        filename: 'bundle-[hash].js'  //输出文件名
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(css|scss)$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] }) }
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
        new ExtractTextPlugin('style-[hash].css')
    ]
}
