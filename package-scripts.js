var npsUtils = require("nps-utils");
var path = require("path");

module.exports = {
  scripts: {
    "clean-lib": "rimraf lib",
    "clean-es": "rimraf es",
    "clean-dist": "rimraf dist",
    "clean-all": npsUtils.series.nps("clean-es", "clean-lib", "clean-dist"),
    "babel-es": "cross-env BABEL_ENV=es babel src --out-dir es --copy-files",
    "babel-lib": "cross-env BABEL_ENV=commonjs babel src --out-dir lib --copy-files",
    "build-es": npsUtils.series.nps("clean-es", "babel-es"),
    "build-lib": npsUtils.series.nps("clean-lib", "babel-lib"),
    "build-libs": npsUtils.series.nps("build-lib", "build-es"),
    "build-dist-dev": "webpack --bail --config ../../config/webpack/webpack.config.dev.js --colors",
    "build-dist-min": "webpack --bail --config ../../config/webpack/webpack.config.js --colors",
    "build-dists": npsUtils.concurrent.nps("build-dist-min", "build-dist-dev"),
    "build-dist": npsUtils.series.nps("clean-dist", "build-dists"),
    "watch-babel-es": "cross-env BABEL_ENV=es babel src --out-dir es --copy-files --watch",
    "watch-babel-lib": "cross-env BABEL_ENV=lib babel src --out-dir lib --copy-files --watch",
    "watch-build": npsUtils.concurrent.nps("watch-babel-es", "watch-babel-lib")
  }
};
