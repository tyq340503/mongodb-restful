const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

module.exports = merge(common, {
    devtool: "eval-source-map", // 仅在开发过程中使用
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[hash].js"
    },
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        port:3000,
        inline: true
    }
});