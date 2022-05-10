"use strict";
/**
 * Webpack frontend test configuration.
 */
const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// Replace with `__dirname` if using in project root.
const ROOT = process.cwd();
const WDS_PORT = 3001;

module.exports = {
  mode: "development",
  cache: true,
  context: path.join(ROOT, "test/client"),
  devtool: false,
  entry: "./main",
  output: {
    filename: "main.js",
    publicPath: "/assets/"
  },
  resolve: {
    fallback: {
      stream: false
    }
  },
  module: {
    rules: [
      {
        // Transform source
        test: /\.js$/,
        // We only transform **test** files.
        // Our source files should be built separately with babel.
        include: [path.resolve("test")],
        use: {
          loader: "babel-loader",
          // eslint-disable-next-line global-require
          options: require("../../.babelrc.js")
        }
      }
    ]
  },
  devServer: {
    port: WDS_PORT,
    noInfo: false
  },
  // https://stackoverflow.com/questions/64475910/replacing-polyfill-for-process-in-webpack-v5-from-v4
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_DEBUG": JSON.stringify(process.env.NODE_DEBUG),
      "process.type": JSON.stringify(process.type),
      "process.version": JSON.stringify(process.version)
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"]
    }),
    new NodePolyfillPlugin()
  ]
};
