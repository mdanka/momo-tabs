"use strict";

var path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const staticFileRegex = /\.(woff|svg|ttf|eot|gif|jpeg|jpg|png)([\?]?.*)$/;

module.exports = {
    mode: "production",
    entry: {
        app: [
            path.resolve(__dirname, "src/clientApp.tsx"),
            path.resolve(__dirname, "src/app.less"),
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/,
                enforce: "pre",
            },
            {
                test: /\.tsx?$/,
                use: [
                    { loader : 'ts-loader' }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'resolve-url-loader'
                }],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'less-loader', // compiles LESS to CSS
                    options: {
                        sourceMap: true,
                        sourceMapContents: false
                    }
                }],
            },
            {
                test: staticFileRegex,
                include: [
                    path.resolve(__dirname, "node_modules"),
                ],
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                    },
                }],
            },
            {
                test: staticFileRegex,
                include: path.resolve(__dirname, "src"),
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name]-[hash].[ext]",
                    },
                }],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
            },
            template: path.resolve(__dirname, "src/index.html"),
            title: "Momo Tabs - Guitar Tabs and Chord Sheets",
        }),
        new WebpackBuildNotifierPlugin({
            title: "Momo Tabs Build",
        }),
        new CopyWebpackPlugin([ { from: "src/static/generated/sitemaps", to: "sitemaps" }, "src/static/robots.txt" ])
    ],
}
