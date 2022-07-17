"use strict";

const path = require("path");
const glob = require("glob");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const ROOT = path.resolve(__dirname, "../../.."); // eslint-disable-line no-undef
const PKGS = path.join(ROOT, "packages")
// Read all the victory packages and alias.
const VICTORY_ALIASES = glob.sync(path.join(PKGS, "victory*/package.json"))
  .reduce((memo, pkgPath) => {
    const key = path.dirname(path.relative(PKGS, pkgPath));
    memo[key] = path.resolve(path.dirname(pkgPath));
    return memo;
  }, {});
const DEMO = path.resolve("demo");
const WDS_PORT = 3000;

module.exports = {
  mode: "development",
  cache: true,
  devServer: {
    port: WDS_PORT,
  },
  output: {
    path: DEMO,
    pathinfo: true,
    filename: "main.js",
    publicPath: "/assets/",
  },
  devtool: "source-map",
  stats: {
    colors: true,
    reasons: true,
  },
  resolve: {
    alias: VICTORY_ALIASES,
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Transform source
        test: /(\.js|\.tsx?)$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: [DEMO],
        use: {
          loader: "babel-loader",
          // eslint-disable-next-line global-require
          options: require("../../../.babelrc.js"),
        },
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      shorthands: true,
      currying: true,
      flattening: true,
      paths: true,
      placeholders: true,
    }),
  ]
};
