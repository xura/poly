const path = require('path');

module.exports = {
    entry: './src/renderer/core/database/store/index',
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'data-store/dist'),
        filename: 'app.bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'data-store'),
        port: 9000,
        historyApiFallback: true
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            options: {
                presets: ["@babel/typescript"],
                plugins: ["@babel/plugin-proposal-optional-chaining", "@babel/plugin-proposal-nullish-coalescing-operator"]
            },
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
};
