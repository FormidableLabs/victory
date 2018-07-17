"use strict";
/*
 * Karma Configuration: "full" version.
 *
 * This configuration runs a temporary `webpack-dev-server` and builds
 * the test files one-off for just a single run. This is appropriate for a
 * CI environment or if you're not otherwise running `npm run dev|hot`.
 */
var path = require("path");
var webpackCfg = require("../webpack/webpack.config.test");

var MAIN_PATH = path.join(process.cwd(), "test/client/main.js");
var POLYFILL_PATH = path.join(
  path.dirname(require.resolve("core-js/package.json")), "es6/**/*.js"
);
var PREPROCESSORS = {};
PREPROCESSORS[MAIN_PATH] = ["webpack"];
PREPROCESSORS[POLYFILL_PATH] = ["webpack"];

module.exports = function (config) {
  /* eslint-disable global-require */

  // Start with the "dev" (webpack-dev-server is already running) config
  // and add in the webpack stuff.
  require("./karma.conf.dev")(config);

  // Overrides.
  config.set({
    preprocessors: PREPROCESSORS,
    files: [
      // Sinon has issues with webpack. Do global include.
      require.resolve("sinon/pkg/sinon"),

      // Polyfills for PhantomJS in React 16.
      require.resolve("core-js/es6/map"),
      require.resolve("core-js/es6/set"),

      // Test bundle (created via local webpack-dev-server in this config).
      MAIN_PATH
    ],
    webpack: webpackCfg,
    webpackServer: {
      port: 3002, // Choose a non-conflicting port (3000 app, 3001 test dev)
      quiet: false,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    }
  });
};
