"use strict";
/**
 * Webpack frontend test (w/ coverage) configuration.
 */
var _ = require("lodash");
var testCfg = require("./webpack.config.test");

module.exports = _.merge({}, testCfg, {
  module: {
    rules: (testCfg.module.rules || []).concat([
      {
        test: /src\/.*\.js$/,
        exclude: /(test|node_modules)\//,
        use: {
          loader: require.resolve("istanbul-instrumenter-loader"),
          options: { esModules: true }
        },
        enforce: "post"
      }
    ])
  }
});
