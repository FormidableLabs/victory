var npsUtils = require("nps-utils");

module.exports = {
  scripts: {
    server: {
      dev: {
        ts: "webpack serve --config ./config/webpack/demo/webpack.config.dev-ts.js",
        default:
          "webpack serve --config ./config/webpack/demo/webpack.config.dev.js --content-base demo/js"
      },
      hot: "webpack serve --config ./config/webpack/demo/webpack.config.hot.js --inline --hot --content-base demo/js",
      test: "webpack serve --config ./config/webpack/webpack.config.test.js"
    },
    karma: {
      ci: "karma start --browsers ChromeHeadlessCustom,Firefox ./config/karma/karma.conf.coverage.js",
      cov: "karma start ./config/karma/karma.conf.coverage.js",
      watch: "karma start --auto-watch ./config/karma/karma.conf.js",
      default: "karma start ./config/karma/karma.conf.js"
    },
    jest: {
      native: "jest --config=jest-config.js",
      default: "jest --config=jest-config.js"
    },
    test: {
      cov: npsUtils.series.nps("build-package-libs", "karma.cov"),
      dev: "karma start ./config/karma/karma.conf.dev.js",
      watch: npsUtils.series.nps("build-package-libs", "karma.watch"),
      default: npsUtils.series.nps("build-package-libs", "karma")
    },
    storybook: {
      server: "start-storybook -p 6006",
      default: npsUtils.concurrent.nps("watch", "storybook.server")
    },
    start: {
      ts: npsUtils.concurrent.nps("watch", "server.dev.ts"),
      default: npsUtils.concurrent.nps("watch", "server.dev", "server.test")
    },
    lint: {
      src: "lerna exec --stream -- eslint --color --ext .js,.jsx,.ts,.tsx src",
      demo: "eslint --color --ext .js,.jsx,.ts,.tsx demo",
      docs: "eslint --color --ext .js,.jsx docs",
      stories: "eslint --color stories",
      test: "eslint --color test",
      ts: npsUtils.series.nps("build-package-libs", "compile-ts"),
      default: npsUtils.series.nps(
        "lint.test",
        "lint.stories",
        "lint.demo",
        "lint.src"
      )
    },
    format: {
      default: 'prettier --write "./**/*.{js,jsx,json,ts,tsx}"',
      ci: 'prettier --list-different "./**/*.{js,jsx,json,ts,tsx}"'
    },
    check: {
      ci: npsUtils.series.nps(
        "format.ci",
        "lint",
        "build-package-libs",
        "build-package-dists",
        "karma.ci",
        "jest",
        "compile-ts"
      ),
      cov: npsUtils.series.nps("lint", "test.cov"),
      dev: npsUtils.series.nps("lint", "test.dev"),
      default: npsUtils.series.nps("lint", "test")
    },
    watch: {
      es: "lerna exec --parallel -- cross-env BABEL_ENV=es babel src --out-dir es --copy-files --watch",
      lib: "lerna exec --parallel -- cross-env BABEL_ENV=lib babel src --out-dir lib --copy-files --watch",
      default: npsUtils.concurrent.nps("watch.es", "watch.lib")
    },
    clean: {
      lib: "rimraf lib",
      es: "rimraf es",
      dist: "rimraf dist",
      default: npsUtils.concurrent.nps("clean.es", "clean.lib", "clean.dist"),
      all: "lerna exec --parallel -- nps clean"
    },
    "compile-ts": "tsc --project tsconfig.json --noEmit",
    // Version testing helpers
    "lerna-dry-run":
      "lerna version --no-git-tag-version --no-push --loglevel silly",
    // TODO: organize build scripts once build perf is sorted out
    "babel-es": "cross-env BABEL_ENV=es babel src --out-dir es --copy-files",
    "babel-lib":
      "cross-env BABEL_ENV=commonjs babel src --out-dir lib --copy-files",
    "build-es": npsUtils.series.nps("clean.es", "babel-es"),
    "build-lib": npsUtils.series.nps("clean.lib", "babel-lib"),
    "build-libs": npsUtils.series.nps("build-lib", "build-es"),
    "build-package-libs":
      "lerna exec --parallel --ignore victory-native -- nps build-libs",
    "build-dist-dev":
      "webpack --bail --config ../../config/webpack/webpack.config.dev.js",
    "build-dist-min":
      "webpack --bail --config ../../config/webpack/webpack.config.js",
    "build-dists": npsUtils.concurrent.nps("build-dist-min", "build-dist-dev"),
    "build-dist": npsUtils.series.nps("clean.dist", "build-dists"),
    "build-package-dists":
      "lerna exec --parallel --ignore victory-native -- nps build-dists",
    bootstrap: "lerna bootstrap",
    "link-parent-bin": "link-parent-bin"
  }
};
