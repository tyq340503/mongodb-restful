const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        "index": "./index.js"
    },
    module: {
        rules: [
            {
                test: /\.js\/*\.js$/,
                use: {
                    loader: "babel-loader?cacheDirectory=true", // 使用cache提升编译速度
                    options: {
                        presets: ["env"],
                        plugins: ["transform-runtime"]// 避免重复引入
                    }
                },
                exclude: /node-modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.temp.html")
        })
    ]
};