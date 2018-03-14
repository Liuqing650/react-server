const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;
const config = {
  entry: {
    main: [
      'webpack-dev-server/client?http://' + host + ':' + port + '/__webpack_hmr',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, './src/index.js')
    ]
  },
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
