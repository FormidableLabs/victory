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
  entry: "./demo/ts/app.tsx",
  devServer: {
    port: WDS_PORT,
    contentBase: "./demo/ts",
    noInfo: false
  },
  output: {
    path: path.resolve("demo"),
    pathinfo: true,
    filename: "main.js",
    publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.join(DEMO, "ts")],
        loader: "ts-loader"
      },
      {
        // Transform source
        test: /\.js$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: FILES,
        use: {
          loader: "babel-loader",
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
