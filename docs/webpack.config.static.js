var CleanPlugin = require("clean-webpack-plugin");
var path = require("path");
var StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var DefinePlugin = require("webpack").DefinePlugin;


var base = require("./webpack.config.dev.js");

var OUTPUT_DIR = "docs/build";

// All routes we want to static-render--in this case, just the index page:
var routes = [
  ""
];

module.exports = {
  entry: {
    main: "./docs/static-render-entry.jsx"
  },
  output: {
    path: path.join(__dirname, "..", OUTPUT_DIR),
    filename: "main.[hash].js",
    libraryTarget: "umd" // Needs to be universal for `static-site-generator-webpack-plugin` to work
  },
  resolve: base.resolve,
  module: base.module,
  plugins: [
    new CleanPlugin([ "../" + OUTPUT_DIR ]),
    new StatsWriterPlugin({
      filename: "stats.json"
    }),
    new DefinePlugin({
      "process.env": {
        // Disable warnings for static build
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new StaticSiteGeneratorPlugin("main", routes)
  ]
};
