"use strict";

var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const staticFileRegex = /\.(woff|svg|ttf|eot|gif|jpeg|jpg|png)([\?]?.*)$/;

module.exports = {
    mode: "production",
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'resolve-url-loader'
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'less-loader', // compiles LESS to CSS
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ],
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
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.(css|less|scss)$/,
    //                 chunks: 'all',
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        })
    ]
}
