"use strict";
/**
 * Webpack frontend test (w/ coverage) configuration.
 */
const _ = require("lodash");
const testCfg = require("./webpack.config.test");

module.exports = _.merge({}, testCfg, {
  module: {
    rules: (testCfg.module.rules || []).concat([
      {
        // Provide coverage only for our ESM output.
        test: /\/es\/.*\.js$/,
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
