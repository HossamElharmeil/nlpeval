const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new FaviconsWebpackPlugin('./src/client/assets/logo.png'),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        new HtmlWebPackPlugin({
            title: 'NLP Eval',
            template: "./src/client/views/index.html",
            filename: "./index.html",
        })
    ]
}
