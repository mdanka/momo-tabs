"use strict";

const path = require("path");
const baseWebpackConfig = require("./webpack.config");

module.exports = Object.assign({}, baseWebpackConfig, {
    target: 'node',
    entry: {
        app: [
            path.resolve(__dirname, "src/serverApp.tsx"),
        ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'functions'),
        libraryTarget: 'commonjs2',
        publicPath: "/",
    },
});
