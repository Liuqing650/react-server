const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'static/dist/'),
    filename: 'index.js',
    publicPath: '/static/dist/'
  },
  plugins: [
    new CleanWebpackPlugin(['static/dist'])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },{
        test: /\.json$/,
        use: [
          'json-loader'
        ],
      }
    ]
  },
  resolve: {
    alias: {
      root: __dirname
    }
  }
};

module.exports = config;
