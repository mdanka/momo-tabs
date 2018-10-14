"use strict";

var path = require('path');

const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const staticFileRegex = /\.(woff|svg|ttf|eot|gif|jpeg|jpg|png)([\?]?.*)$/;

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, "src/app.tsx"),
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
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/,
            },
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style",
                    [
                        "css?sourceMap",
                        "postcss",
                    ],
                    {
                        publicPath: "", // Don't add public path to url()
                    }
                ),
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    "style",
                    [
                        "css?sourceMap",
                        "postcss",
                        "less?sourceMap",
                    ],
                    {
                        publicPath: "", // Don't add public path to url()
                    }
                ),
            },
            {
                test: staticFileRegex,
                include: [
                    path.resolve(__dirname, "node_modules"),
                ],
                loader: "file-loader",
                query: {
                    name: "[path][name].[ext]",
                },
            },
            {
                test: staticFileRegex,
                include: path.resolve(__dirname, "src"),
                loader: "file-loader",
                query: {
                    name: "[name]-[hash].[ext]",
                },
            }
        ],
    },
    postcss: () => {
        return [
            autoprefixer({
                browsers: [
                    "> 1%",
                    "last 2 versions",
                    "Firefox ESR",
                    "Opera 12.1",
                ],
            }),
        ];
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
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
