"use strict";

const path = require("path");
const webpack = require("webpack");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const SRC = path.resolve("src");

// **Little Hacky**: Infer the filename and library name from the package name.
//
// Assumptions:
// - `package.json`'s `name` field is name of dist files.
// - PascalCased version of that name is exported class name.
const PKG = require(path.resolve("package.json"));
const libPath = (PKG.name || "").toLowerCase();
if (!libPath) {
  throw new Error("Need package.json:name field");
}
// PascalCase (with first character capitalized).
const libName = libPath
  .replace(/^\s+|\s+$/g, "")
  .replace(/(^|[-_ ])+(.)/g, (match, first, second) => {
    // Second match group is the character we want to change. Throw away first.
    return second.toUpperCase();
  });

module.exports = {
  cache: true,
  context: SRC,
  entry: "./index",
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-native": "react-native",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    path: path.resolve("dist"),
    filename: `${libPath}.min.js`,
    library: libName,
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        // Transform source
        test: /(\.js|\.tsx?)$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: [SRC],
        use: {
          loader: "babel-loader",

          options: require("../../.babelrc.js"),
        },
      },
    ],
  },
  mode: "production",
  plugins: [
    new LodashModuleReplacementPlugin({
      currying: true,
      flattening: true,
      paths: true,
      placeholders: true,
      shorthands: true,
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
};
