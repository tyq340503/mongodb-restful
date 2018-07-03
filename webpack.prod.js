const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
    devtool: "source-map", // 生产环境也可以设置，有点儿影响性能，但方便调试"
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        // new webpack.BannerPlugin("版权所有，盗版必究！"),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false// remove all comments
            },
            compress: {
                warnings: false
            },
            sourceMap: true // 如果你在压缩代码时启用了 source map，或者想要让 uglifyjs 的警告能够对应到正确的代码行，你需要将 UglifyJsPlugin 的 sourceMap 设为 true。
        })
    ]
});