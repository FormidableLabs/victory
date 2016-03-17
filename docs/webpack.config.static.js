"use strict";

var path = require("path");
var webpack = require("webpack");

var CleanPlugin = require("clean-webpack-plugin");
var StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

var DefinePlugin = webpack.DefinePlugin;
var DedupePlugin = webpack.optimize.DedupePlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var base = require("./webpack.config.dev.js");

var OUTPUT_DIR = "build";

// All routes we want to static-render:
var routes = [
  "/",
  "docs",
  "docs/victory-axis",
  "docs/victory-area",
  "docs/victory-chart",
  "docs/victory-pie",
  "docs/victory-bar",
  "docs/victory-line",
  "docs/victory-scatter",
  "docs/victory-animation",
  "docs/victory-label"
];

module.exports = {
  entry: {
    main: "./docs/components/static-render-entry.jsx"
  },
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: "main.[hash].js",
    libraryTarget: "umd" // Needs to be universal for `static-site-generator-webpack-plugin` to work
  },
  resolve: base.resolve,
  module: base.module,
  plugins: [
    new CleanPlugin([ path.join(__dirname, OUTPUT_DIR) ], {
      root: path.join(__dirname, "..")
    }),
    new DefinePlugin({
      "process.env": {
        // Disable warnings for static build
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new DedupePlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new StatsWriterPlugin({
      filename: "stats.json"
    }),
    new StaticSiteGeneratorPlugin("main", routes)
  ]
};
