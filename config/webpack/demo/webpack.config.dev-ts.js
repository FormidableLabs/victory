"use strict";

var path = require("path");
var glob = require("glob");
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

var ROOT = process.cwd();
var PACKAGES = glob.sync("packages/*/src", { root: ROOT });
var FILES = PACKAGES.map(function(p) {
  return path.join(ROOT, p);
});
var DEMO = path.resolve("demo");
var WDS_PORT = 3000;

module.exports = {
  mode: "development",
  resolve: {
    alias: {
      "@packages": path.resolve("packages")
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  entry: "./demo/ts/app.tsx",
  devServer: {
    port: WDS_PORT,
    contentBase: "./demo/ts",
    noInfo: false
  },
  output: {
    path: path.resolve("demo"),
    pathinfo: true,
    filename: "main.js",
    publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [`${DEMO}/ts`],
        loader: "ts-loader"
      },
      {
        // Transform source
        test: /\.js$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: FILES,
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
