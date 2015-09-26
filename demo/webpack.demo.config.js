'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = webpack({
  cache: true,
  debug: false,
  devtool: 'source-map',
  entry: {
    bundle: './demo/index.jsx'
  },
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=1'
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: [__dirname],
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['','.js','.jsx']
  }
});