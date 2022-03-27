const fs = require('fs');
const { mergeWithRules } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'prepend'
    }
  },
  plugins: 'append'
})(common, {
  mode: 'develop',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                'react-refresh/babel'
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    open: false,
    historyApiFallback: true,
    hot: true,
    port: 8080,
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync('./private.key'),
        cert: fs.readFileSync('./private.crt'),
        ca: fs.readFileSync('./private.csr'),
      }
    },
    static: {
      watch: {
        directory: './dist',
        poll: true,
        ignored: '/node_modules/'
      }
    },
    proxy: [
      {
        context: [ '/api' ],
        target: 'https://localhost:5001'
      }
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
});