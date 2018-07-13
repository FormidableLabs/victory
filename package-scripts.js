var npsUtils = require("nps-utils");
var path = require("path");

module.exports = {
  scripts: {
    server: {
      dev: "webpack-dev-server --config ./config/webpack/demo/webpack.config.dev.js --colors --content-base demo",
      hot: "webpack-dev-server --config ./config/webpack/demo/webpack.config.hot.js --colors --inline --hot --content-base demo",
      test: "webpack-dev-server --config ./config/webpack/webpack.config.test.js --colors",
    },
    test: {
      ci: "karma start --browsers PhantomJS,Firefox ./config/karma/karma.conf.coverage.js",
      cov: "karma start ./config/karma/karma.conf.coverage.js",
      dev: "karma start ./config/karma/karma.conf.dev.js",
      default: "karma start ./config/karma/karma.conf.js",
    },
    start: npsUtils.concurrent.nps("server.dev", "server.test"),
    storybook: "start-storybook -p 6006",
    chromatic: {
      ci: "chromatic test --storybook-addon --exit-zero-on-changes",
      default: "chromatic test --storybook-addon"
    },
    lint: {
      src: "lerna exec --parallel -- eslint --color src",
      demo: "eslint --color demo",
      stories:  "eslint --color stories",
      test:  "eslint --color test",
      default: npsUtils.series.nps("lint.test", "lint.stories", "lint.demo", "lint.src")
    },
    check: {
      ci: npsUtils.series.nps("lint", "test.ci"),
      cov: npsUtils.series.nps("lint", "test.cov"),
      dev: npsUtils.series.nps("lint", "test.dev"),
      default: npsUtils.series.nps("lint", "test")
    },
    watch: {
      es: "cross-env BABEL_ENV=es babel src --out-dir es --copy-files --watch",
      lib: "cross-env BABEL_ENV=lib babel src --out-dir lib --copy-files --watch",
      default: npsUtils.concurrent.nps("watch.es", "watch.lib")
    },
    clean: {
      lib: "rimraf lib",
      es: "rimraf es",
      dist: "rimraf dist",
      default: npsUtils.concurrent.nps("clean.es", "clean.lib", "clean.dist"),
      all: "lerna exec --parallel -- nps clean"
    },
    // Version testing helpers
    "publishr-dry-run": "lerna exec -- publishr dry-run -V",
    "lerna-dry-run": "lerna publish --skip-git --skip-npm --loglevel silly",
    "global-postpublish": "lerna exec --parallel -- publishr postpublish -V"
    // TODO: organize build scripts once build perf is sorted out
    "babel-es": "cross-env BABEL_ENV=es babel src --out-dir es --copy-files",
    "babel-lib": "cross-env BABEL_ENV=commonjs babel src --out-dir lib --copy-files",
    "build-es": npsUtils.series.nps("clean.es", "babel-es"),
    "build-lib": npsUtils.series.nps("clean.lib", "babel-lib"),
    "build-libs": npsUtils.series.nps("build-lib", "build-es"),
    "build-dist-dev": "webpack --bail --config ../../config/webpack/webpack.config.dev.js --colors",
    "build-dist-min": "webpack --bail --config ../../config/webpack/webpack.config.js --colors",
    "build-dists": npsUtils.concurrent.nps("build-dist-min", "build-dist-dev"),
    "build-dist": npsUtils.series.nps("clean.dist", "build-dists")
  }
};
