"use strict";

const path = require("path");
const glob = require("glob");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const ROOT = process.cwd();
const PACKAGES = glob.sync("packages/*/src", { root: ROOT });
const FILES = PACKAGES.map(function (p) {
  return path.join(ROOT, p);
});
const DEMO = path.resolve("demo");
const WDS_PORT = 3000;

module.exports = {
  mode: "development",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  devServer: {
    port: WDS_PORT
  },

  output: {
    path: DEMO,
    pathinfo: true,
    filename: "main.js",
    publicPath: "/assets/"
  },

  cache: true,
  devtool: "source-map",
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        // Transform source
        test: /(\.js|\.tsx?)$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: [DEMO, ...FILES],
        use: {
          loader: "babel-loader",
          // eslint-disable-next-line global-require
          options: require("../../../.babelrc.js")
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      shorthands: true,
      currying: true,
      flattening: true,
      paths: true,
      placeholders: true
    })
  ]
};
