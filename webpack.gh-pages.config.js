'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  cache: true,
  debug: false,
  devtool: 'source-map',
  entry: {
    bundle: './demo/index.jsx'
  },
  output: {
    path: '/dist',
    filename: 'bundle.js'
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
        loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }, {
        test: /\.md$/,
        loader: "html!markdown"
      },
      {
        test: /\.(eot|ico|gif|png|svg|woff)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: [__dirname],
    modulesDirectories: ['node_modules'],
    extensions: ['','.js','.jsx']
  }
};
