"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var glob = require("glob");
var webpack = require("webpack");

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();
var WDS_PORT = 3001;
var PACKAGES = glob.sync("packages/*/src", { root: ROOT });
var FILES = PACKAGES.map(function (p) {
  return path.join(ROOT, p);
});

module.exports = {
  mode: "development",
  cache: true,
  context: path.join(ROOT, "test/client"),
  devtool: false,
  entry: "./main",
  output: {
    filename: "main.js",
    publicPath: "/assets/"
  },
  resolve: {
    alias: {
      packages: path.join(ROOT, "packages")
    },
    fallback: {
      stream: false
    }
  },
  module: {
    rules: [
      {
        // Transform source
        test: /\.js$/,
        // Use include specifically of our sources
        // Do _not_ use an `exclude` here.
        include: FILES.concat([path.resolve("test")]),
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    port: WDS_PORT,
    noInfo: false
  },
  // https://stackoverflow.com/questions/64475910/replacing-polyfill-for-process-in-webpack-v5-from-v4
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_DEBUG": JSON.stringify(process.env.NODE_DEBUG),
      "process.type": JSON.stringify(process.type),
      "process.version": JSON.stringify(process.version)
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"]
    })
  ]
};
