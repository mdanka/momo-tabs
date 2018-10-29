"use strict";

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require("path");
const baseWebpackConfig = require("./webpack.config");

module.exports = Object.assign({}, baseWebpackConfig, {
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
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "Momo Tabs Build - Client",
        }),
        new CopyWebpackPlugin([ { from: "src/static/generated/sitemaps", to: "sitemaps" }, "src/static/robots.txt" ])
    ],
});
