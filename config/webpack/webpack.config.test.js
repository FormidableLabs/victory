"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var glob = require("glob");

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();
var WDS_PORT = 3001;
var PACKAGES = glob.sync("packages/*/src", { root: ROOT });
var FILES = PACKAGES.map(function(p) {
  return path.join(ROOT, p);
});
module.exports = {
  cache: true,
  context: path.join(ROOT, "test/client"),
  entry: "./main",
  output: {
    filename: "main.js",
    publicPath: "/assets/"
  },
  resolve: {
    alias: {
      packages: path.join(ROOT, "packages")
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
  }
};
