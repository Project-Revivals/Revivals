const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: `${__dirname}/dist`,
        filename: "main.js"
    },
    resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            title: 'Project Revivals',
            // favicon: './favicon.svg',
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8090,
        static: {
            directory: path.join(__dirname, 'dist')
        }
    }
};