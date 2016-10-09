const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',

    entry: {
        app: "./source/main-dev.js",
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "react-widget-bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: ['babel'],
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['transform-runtime', 'transform-decorators-legacy']
                }
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
            },

            {
                test: /\.svg$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },

            {
                test: /\.html$/,
                loader: 'html',
            }
        ]
    },

    postcss: [
        require('autoprefixer-core'),
        require('postcss-color-rebeccapurple')
    ],

    resolve: {
        modulesDirectories: ['node_modules', 'components']
    },

    devServer: { historyApiFallback: true },

    plugins: [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"dev"' }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index-template.html',
            inject: 'body'
        })
    ]
};
