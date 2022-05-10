"use strict";
const path = require("path");

const MAIN_PATH = path.resolve("test/client/main.js");
const PREPROCESSORS = {};
PREPROCESSORS[MAIN_PATH] = ["webpack"];

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
    frameworks: ["mocha"],
    reporters: ["spec"],
    browsers: ["ChromeHeadlessCustom"],
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: "ChromeHeadless",
        // --no-sandbox for https://github.com/travis-ci/docs-travis-ci-com/pull/1671/files
        flags: ["--no-sandbox"]
      }
    },
    basePath: ".", // repository root.
    preprocessors: PREPROCESSORS,
    files: [
      // Sinon has issues with webpack. Do global include.
      require.resolve("sinon/pkg/sinon"),

      // Test bundle (must be created via `npm run dev|hot|server-test`)
      "http://127.0.0.1:3001/assets/main.js"
    ],
    port: 9999,
    singleRun: true,
    client: {
      mocha: {
        ui: "bdd"
      },
      captureConsole: process.env.KARMA_CAPTURE_CONSOLE === "true"
    }
  });
};
