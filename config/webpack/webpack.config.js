"use strict";

var path = require("path");
var webpack = require("webpack");
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

var SRC = path.resolve("src");

// **Little Hacky**: Infer the filename and library name from the package name.
//
// Assumptions:
// - `package.json`'s `name` field is name of dist files.
// - PascalCased version of that name is exported class name.
var PKG = require(path.resolve("package.json"));
var libPath = (PKG.name || "").toLowerCase();
if (!libPath) { throw new Error("Need package.json:name field"); }
// PascalCase (with first character capitalized).
var libName = libPath
  .replace(/^\s+|\s+$/g, "")
  .replace(/(^|[-_ ])+(.)/g, function (match, first, second) {
    // Second match group is the character we want to change. Throw away first.
    return second.toUpperCase();
  });

module.exports = {
  cache: true,
  context: SRC,
  entry: "./index",
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    },
    {
      "prop-types": {
        root: "PropTypes",
        commonjs2: "prop-types",
        commonjs: "prop-types",
        amd: "prop-types"
      }
    }
  ],
  output: {
    path: path.resolve("dist"),
    filename: libPath + ".min.js",
    library: libName,
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        // Transform source
        test: /\.js$/,
        // Use include specifically of our sources.
        // Do _not_ use an `exclude` here.
        include: [SRC],
        // **Note**: Cannot use shorthand `"babel-loader"` or `"babel"` when
        // we are playing around with `NODE_PATH` in builder. Manually
        // resolve path.
        loader: require.resolve("babel-loader")
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      "currying": true,
      "flattening": true,
      "paths": true,
      "placeholders": true,
      "shorthands": true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
};
