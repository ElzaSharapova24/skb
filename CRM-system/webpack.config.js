const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const glob = require("webpack-glob-entry");

module.exports = (env, argv) => {
    const isDev = argv.mode === "development";
    return {
        entry: ["./src/js/main.js"],
        mode: argv.mode,
        name: "CRM-system",
        devtool: isDev ? "source-map" : false,
        output: {
            path: path.resolve("./build"),
            filename: "[name]-[hash].js",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "[name].css" : "[name].[hash].css",
            }),
        ],
        resolve: {
            extensions: [".js", ".scss"],
            modules: [".", "node_modules"],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "build"),
            },
            open: true,
            port: 9000,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/env"],
                            plugins: [],
                        },
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDev,
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    type: "asset",
                },
            ],
        },
        optimization: {
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: ["imagemin-pngquant"],
                        },
                    },
                    loader: false,
                }),
            ],
        },
    };
};
