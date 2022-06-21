"use strict";

const config = require("./webpack.config");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

// **WARNING**: Mutates base configuration.
// We do this because lodash isn't available in `production` mode.
config.output.filename = config.output.filename.replace(/\.min\.js$/, ".js");
config.mode = "development";
config.devtool = false;
config.plugins = [
  new LodashModuleReplacementPlugin({
    currying: true,
    flattening: true,
    paths: true,
    placeholders: true,
    shorthands: true,
  }),
];

// Export mutated base.
module.exports = config;
