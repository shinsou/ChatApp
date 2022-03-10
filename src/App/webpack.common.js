const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

module.exports = {
    target: 'web',
    entry: {
        main: './src/index.tsx'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", "scss"],
        symlinks: false
    },
    output: {
        filename: '[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                type: 'asset/resource'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            publicPath: '/',
            chunks: [ 'main' ]
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: '.'
        }),
        new CopyPlugin({
            patterns: [
                { from: './public/favicon.ico' }
            ]
        })
    ]
}