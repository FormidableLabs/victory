"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();
var WDS_PORT = 3001;

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
        include: [
          path.resolve("test"),
          path.resolve("perf"),
          path.resolve("packages", "victory-chart", "src"),
          path.resolve("packages", "victory-core", "src"),
          path.resolve("packages", "victory-pie", "src")
        ],
        loader: "babel-loader"
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    port: parseInt(process.env.npm_package_config_wds_port_test || WDS_PORT),
    noInfo: false
  }
};
