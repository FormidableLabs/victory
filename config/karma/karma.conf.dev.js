"use strict";
var path = require("path");

var MAIN_PATH = path.join(process.cwd(), "test/client/main.js");
var POLYFILL_PATH = path.join(
  path.dirname(require.resolve("core-js/package.json")), "es6/**/*.js"
);
var PREPROCESSORS = {};
PREPROCESSORS[MAIN_PATH] = ["webpack"];
PREPROCESSORS[POLYFILL_PATH] = ["webpack"];

/*
 * Karma Configuration: "dev" version.
 *
 * This configuration relies on a `webpack-dev-server` already running and
 * bundling `webpack.config.test.js` on port 3001. If this is not running,
 * then the alternate `karma.conf.js` file will _also_ run the webpack dev
 * server during the test run.
 */
module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "phantomjs-shim"],
    reporters: ["spec"],
    browsers: ["PhantomJS"],
    basePath: ".", // repository root.
    preprocessors: PREPROCESSORS,
    files: [
      // Sinon has issues with webpack. Do global include.
      require.resolve("sinon/pkg/sinon"),

      // Polyfills for PhantomJS in React 16.
      require.resolve("core-js/es6/map"),
      require.resolve("core-js/es6/set"),

      // Test bundle (must be created via `npm run dev|hot|server-test`)
      "http://127.0.0.1:3001/assets/main.js"
    ],
    port: 9999,
    singleRun: true,
    client: {
      mocha: {
        ui: "bdd"
      }
    }
  });
};
