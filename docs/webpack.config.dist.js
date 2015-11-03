/*globals __dirname:false */
"use strict";

var webpack = require("webpack");

module.exports = {

  output: {
    path: __dirname,
    filename: "dist.js",
    publicPath: "/assets/"
  },

  cache: true,
  devtool: "eval-source-map",
  entry: {
    app: ["./docs/docs.jsx"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  externals: [
    {
      "react": "React"
    },
    {
      "babel-core/browser": "babel"
    }
  ],
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
  ]
};
