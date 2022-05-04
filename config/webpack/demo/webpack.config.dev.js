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

  devServer: {
    port: WDS_PORT,
    contentBase: "./demo/js",
    noInfo: false
  },

  output: {
    path: DEMO,
    pathinfo: true,
    filename: "main.js",
    publicPath: "/assets/"
  },

  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./demo/js/app"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        // Transform source
        test: /\.js$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: FILES.concat([path.join(DEMO, "js")]),
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
