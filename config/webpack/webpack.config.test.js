"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var prodCfg = require("./webpack.config");

var _ = require("lodash");

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();
var WDS_PORT = 3001;

module.exports = {
  cache: true,
  context: path.join(ROOT, "test"),
  entry: "./client/main",
  output: {
    filename: "main.js",
    publicPath: "/assets/"
  },
  resolve: _.merge({}, prodCfg.resolve, {
    alias: {
      // enzyme webpack issue https://github.com/airbnb/enzyme/issues/47
      sinon: "node_modules/sinon/pkg/sinon.js",
      // Allow root import of `src/FOO` from ROOT/src.
      packages: path.join(ROOT, "packages")
    }
  }),
  // enzyme webpack issue https://github.com/airbnb/enzyme/issues/47
  // Please note that externals may have to change for versions of React
  // other than 0.14.x
  externals: {
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
    "text-encoding": "window"
  },
  module: _.assign({}, prodCfg.module, {
    // enzyme webpack issue https://github.com/airbnb/enzyme/issues/47
    noParse: [
      /\/sinon\.js/
    ],
    // enzyme webpack issue https://github.com/airbnb/enzyme/issues/47
    rules: (prodCfg.module.rules || []).concat([
      {
        test: /\.json$/,
        loader: require.resolve("json-loader")
      }
    ])
  }),
  devtool: "source-map",
  devServer: {
    port: parseInt(process.env.npm_package_config_wds_port_test || WDS_PORT)
  }
};
