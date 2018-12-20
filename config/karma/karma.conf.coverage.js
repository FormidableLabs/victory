"use strict";

/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */
var path = require("path");
var webpackCovCfg = require("../webpack/webpack.config.coverage");

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();

module.exports = function(config) {
  /* eslint-disable global-require */
  require("./karma.conf")(config);
  config.set({
    reporters: ["spec", "coverage-istanbul"],
    webpack: webpackCovCfg,
    coverageIstanbulReporter: {
      reports: ["json", "lcov", "text-summary"],
      "report-config": {
        json: { file: "coverage.json" }
      },
      dir: path.join(ROOT, "coverage/client")
    }
  });
};
