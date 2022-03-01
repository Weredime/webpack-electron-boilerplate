const { resolve, normalize } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: resolve(__dirname, "App.ts"),
    mode: process.env.NODE_ENV === "production" ? "production": "development",
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
                use: 'svelte-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/renderer/template.ejs"
        })
    ],
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: "renderer.js",
        path: normalize(resolve(__dirname, "..", "..", "dist"))
    },
    externals: {
        "electron": "commonjs2 electron"
    }
}