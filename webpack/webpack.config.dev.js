const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//读取配置
const app_config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json')).toString());
const LISTEN_PORT = app_config.LISTEN_PORT || 3000;
const BACKEND = app_config.BACKEND;

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),  //入口文件 index.js
    target: 'electron-renderer',
    // devtool: 'eval-source-map',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: LISTEN_PORT,
        proxy: {
            '/mgs_service/api': {
                target: BACKEND,
                pathRewrite: { '^/mgs_service/api': '' },
                changeOrigin: true
            }
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),  //输出路径
        filename: 'bundle.js'  //输出文件名
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({
            APP_MODE: JSON.stringify('DEVELOPMENT')
        })
    ]
}
