const { resolve, normalize } = require("path");

module.exports = {
    entry: resolve(__dirname, "index.ts"),
    mode: process.env.NODE_ENV === "production" ? "production": "development",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: "main.js",
        path: normalize(resolve(__dirname, "..", "..", "dist"))
    },
    externals: {
        "electron": "commonjs2 electron",
        "path": "commonjs2 path"
    }
}