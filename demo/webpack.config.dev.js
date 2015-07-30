/*globals __dirname:false */
"use strict";

var webpack = require("webpack");

module.exports = {

  devServer: {
    contentBase: __dirname,
    noInfo: false
  },

  output: {
    path: __dirname,
    filename: "main.js",
    publicPath: "/assets/"
  },

  cache: true,
  devtool: "eval-source-map",
  entry: {
    app: ["./demo/app.jsx"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: ["babel-loader?stage=0"]
      }, {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192"
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
