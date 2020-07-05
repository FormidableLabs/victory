"use strict";

var path = require("path");
var glob = require("glob");
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

var ROOT = process.cwd();
var PACKAGES = glob.sync("packages/*/src", { root: ROOT });
var FILES = PACKAGES.map(function (p) {
  return path.join(ROOT, p);
});
var DEMO = path.resolve("demo");
var WDS_PORT = 3000;

module.exports = {
  mode: "development",
  resolve: {
    alias: {
      Packages: path.resolve("packages")
    }
  },

  devServer: {
    port: WDS_PORT,
    contentBase: "./demo/js",
    noInfo: false
  },

  output: {
    path: DEMO,
    pathinfo: true,
    filename: "main.js",
    publicPath: "/assets/"
  },

  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./demo/js/app"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        // Transform source
        test: /\.js$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: FILES.concat([`${DEMO}/js`]),
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      shorthands: true,
      currying: true,
      flattening: true,
      paths: true,
      placeholders: true
    })
  ]
};
