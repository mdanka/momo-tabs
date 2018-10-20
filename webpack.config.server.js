"use strict";

const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const baseWebpackConfig = require("./webpack.config");

const baseUrl = "/";
const webpackDevServerPort = "8545";

module.exports = Object.assign({}, baseWebpackConfig, {
    mode: "development",
    entry: [
        ...baseWebpackConfig.entry.app,
        "webpack/hot/dev-server",
    ],
    output: Object.assign({}, baseWebpackConfig.output, {
        publicPath: `http://localhost:${webpackDevServerPort}${baseUrl}`,
    }),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...baseWebpackConfig.plugins.filter((plugin) => !(plugin instanceof CopyWebpackPlugin)),
    ],
    devServer: {
        contentBase: path.join(__dirname, "build", "src"),
        historyApiFallback: {
            index: baseUrl,
        },
        https: false,
        hot: true,
        port: webpackDevServerPort,
        publicPath: `http://localhost:${webpackDevServerPort}${baseUrl}`,
        stats: baseWebpackConfig.stats,
    },
});
