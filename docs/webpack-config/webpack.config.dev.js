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
    filename: "main.js"
  },

  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./docs/components/entry.jsx"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // Though we normally exclude `node_modules`, we need babel to require
        // in documentation from individual Victory components, so we exclude
        // from all `node_modules` packages that *aren't* Victory:
        exclude: function (absPath) {
          return absPath.indexOf("node_modules") > -1 &&
            absPath.indexOf("node_modules/victory") === -1 ||
            absPath.indexOf("formidable-landers") > -1;
        },
        loader: require.resolve("babel-loader"),
        query: {
          "presets": ["es2015", "stage-1", "react"],
          babelrc: false
        }
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
