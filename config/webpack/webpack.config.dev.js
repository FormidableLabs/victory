"use strict";

var webpack = require("webpack");
var config = require("./webpack.config");
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

// **WARNING**: Mutates base configuration.
// We do this because lodash isn't available in `production` mode.
config.output.filename = config.output.filename.replace(/\.min\.js$/, ".js");
config.output.pathinfo = true;
config.plugins = [
  new LodashModuleReplacementPlugin({
    currying: true,
    flattening: true,
    paths: true,
    placeholders: true,
    shorthands: true
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: "[file].map"
  })
];

// Export mutated base.
module.exports = config;
