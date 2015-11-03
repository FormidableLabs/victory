"use strict";
/*
 * Karma Configuration: "full" version.
 *
 * This configuration runs a temporary `webpack-dev-server` and builds
 * the test files one-off for just a single run. This is appropriate for a
 * CI environment or if you're not otherwise running `npm run dev|hot`.
 */
var webpackCfg = require("./webpack.config.test");

// BUG: Karma 0.13 is broken for circular imports
// TODO: Upgrade Karma to 0.13 when upstream bug is fixed.
// https://github.com/FormidableLabs/
//        formidable-react-component-boilerplate/issues/25

module.exports = function (config) {
  /* eslint-disable global-require */

  // Start with the "dev" (webpack-dev-server is already running) config
  // and add in the webpack stuff.
  require("./karma.conf.dev")(config);

  // Overrides.
  config.set({
    preprocessors: {
      "test/client/main.js": ["webpack"]
    },
    files: [
      // Sinon has issues with webpack. Do global include.
      "node_modules/sinon/pkg/sinon.js",

      // Test bundle (created via local webpack-dev-server in this config).
      "test/client/main.js"
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
