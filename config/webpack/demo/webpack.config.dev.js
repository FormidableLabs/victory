"use strict";

const path = require("path");
const glob = require("glob");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const ROOT = path.resolve(__dirname, "../../..");
const PKGS = path.join(ROOT, "packages");
const VICTORY_GLOB = path
  .join(PKGS, "victory*/package.json")
  .replace(/\\/g, "/");
// Read all the victory packages and alias.
const VICTORY_ALIASES = glob.sync(VICTORY_GLOB).reduce((memo, pkgPath) => {
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

          options: require("../../../.babelrc.js"),
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(ROOT, "demo", "ts", "tsconfig.json"),
      },
    }),
    new LodashModuleReplacementPlugin({
      shorthands: true,
      currying: true,
      flattening: true,
      paths: true,
      placeholders: true,
    }),
  ],
};
