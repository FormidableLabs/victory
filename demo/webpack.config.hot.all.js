"use strict";

var _ = require("lodash");
var base = require("./webpack.config.hot");

// Update our own module version.
var mod = _.cloneDeep(base.module);
// First loader needs react hot.
mod.loaders.push({
  test: /\.jsx?$/,
  include: [/node_modules\/victory/],
  loaders: ["react-hot", "babel-loader?stage=0"]
});

module.exports = _.merge({}, _.omit(base, "module"), {
  module: mod
});
