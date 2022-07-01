/**
 * Workspace scripts.
 *
 * We only use `nps` for scripts that we:
 * 1. define at the root of the monorepo
 * 2. that are meant to execute _within_ a workspace
 *
 * If you have an actual root task, define it in root `package.json:scripts`.
 */

module.exports = {
  scripts: {
    // Build.
    // - Libraries
    "build:lib:esm": "cross-env BABEL_ENV=es babel src --out-dir es --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js --source-maps",
    "build:lib:cjs": "cross-env BABEL_ENV=commonjs babel src --out-dir lib --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js --source-maps",
    // - UMD distributions
    "build:dist:dev": "webpack --bail --config ../../config/webpack/webpack.config.dev.js",
    "build:dist:min": "webpack --bail --config ../../config/webpack/webpack.config.js",

    // Quality.
    "lint:base": "eslint --cache --color",
    "lint:pkg": "nps \"lint:base src\"",
    "lint:pkg:fix": "nps \"lint:base --fix src\"",

    // TODO: IMPLEMENT `start` support
    // start: {
    //   ts: npsUtils.concurrent.nps("watch", "server.dev.ts"),
    //   default: npsUtils.concurrent.nps("watch", "server.dev", "server.test"),
    // },
    // server: {
    //   dev: {
    //     ts: "webpack serve --config ./config/webpack/demo/webpack.config.dev.js --static demo/ts --entry ./demo/ts/app",
    //     default:
    //       "webpack serve --config ./config/webpack/demo/webpack.config.dev.js --static demo/js --entry ./demo/js/app",
    //   },
    //   hot: "webpack serve --config ./config/webpack/demo/webpack.config.hot.js --inline --hot --content-base demo/js",
    // },

    // TODO: REDO ALL THE TESTING STUFF
    // jest: {
    //   native: "jest --config=jest-native-config.js",
    //   default: "cross-env BABEL_ENV=commonjs jest --config=jest-config.js",
    //   watch:
    //     "cross-env BABEL_ENV=commonjs jest --watch --config=jest-config.js",
    //   cov: "cross-env BABEL_ENV=commonjs jest --coverage --config=jest-config.js",
    // },
    // "test-node": {
    //   default: "jest ./test/node",
    // },
    // test: {
    //   cov: npsUtils.series.nps("build-package-libs", "jest.default"),
    //   watch: npsUtils.concurrent.nps("watch", "jest.watch"),
    //   default: npsUtils.series.nps("build-package-libs", "jest.cov"),
    // },

    // TODO: IMPLEMENT STORYBOOK
    // storybook: {
    //   server: "start-storybook -p 6006",
    //   default: npsUtils.concurrent.nps("watch", "storybook.server"),
    // },

    // TODO: IMPLEMENT FORMAT
    // format: {
    //   fix: 'prettier --write "./**/*.{js,jsx,json,ts,tsx}"',
    //   ci: 'prettier --list-different "./**/*.{js,jsx,json,ts,tsx}"',
    //   default: "pnpm nps format.fix",
    // },

    // TODO: IMPLEMENT TYPECHECK
    // typecheck: {
    //   default: npsUtils.series.nps("typecheck.packages", "typecheck.test"),
    //   src: "tsc --noEmit",
    //   demo: "tsc -p ./demo/tsconfig.json --noEmit",
    //   test: "tsc -p ./test/tsconfig.json --noEmit",
    //   core: "lerna exec --scope victory-core -- nps typecheck.src",
    //   packages: "lerna exec --ignore victory-vendor -- nps typecheck.src",
    // },
    // types: {
    //   lib: npsUtils.concurrent.nps("types.create-lib", "types.copy-lib"),
    //   es: npsUtils.concurrent.nps("types.create-es", "types.copy-es"),
    //   create:
    //     "tsc -p ./tsconfig.build.json --emitDeclarationOnly --rootDir src",
    //   "create-lib":
    //     'nps types.create -- -- --outDir lib || echo "Ignoring TypeScript Errors"',
    //   "create-es":
    //     'nps types.create -- -- --outDir es || echo "Ignoring TypeScript Errors"',
    //   "create-lib-watch": "nps types.create -- -- --outDir lib --watch",
    //   "create-es-watch": "nps types.create -- -- --outDir es --watch",
    //   copy: "cpx 'src/**/*.d.ts'",
    //   "copy-lib": "nps types.copy -- -- lib",
    //   "copy-es": "nps types.copy -- -- es",
    //   "copy-lib-watch": "nps types.copy -- -- lib --watch",
    //   "copy-es-watch": "nps types.copy -- -- es --watch",
    // },

    // TODO: Implement global check. Could be wireit at _root_ package.json
    // check: {
    //   ci: npsUtils.series.nps(
    //     "format.ci",
    //     "lint",
    //     "typecheck",
    //     "test-node",
    //     "jest",
    //     "jest.native",
    //   ),
    //   cov: npsUtils.series.nps("lint", "test.cov"),
    //   dev: npsUtils.series.nps("lint", "test.dev"),
    //   default: npsUtils.series.nps("lint", "test"),
    // },

    // TODO: Implement all watches.
    // watch: {
    //   // `victory-vendor` is built 1x up front and not watched.
    //   default: npsUtils.series.nps("build-package-libs-vendor", "watch.all"),
    //   all: 'lerna exec --parallel --ignore victory-native --ignore victory-vendor "nps watch.core"',
    //   core: npsUtils.concurrent.nps("watch.es", "watch.lib"),
    //   lib: npsUtils.concurrent.nps(
    //     "babel-lib-watch",
    //     "types.create-lib-watch",
    //     "types.copy-lib-watch",
    //   ),
    //   es: npsUtils.concurrent.nps(
    //     "babel-es-watch",
    //     "types.create-es-watch",
    //     "types.copy-es-watch",
    //   ),
    // },

    // TODO: Implement clean and root clean
    // clean: {
    //   lib: "rimraf lib",
    //   es: "rimraf es",
    //   dist: "rimraf dist",
    //   default: npsUtils.concurrent.nps("clean.es", "clean.lib", "clean.dist"),
    //   all: "lerna exec --parallel --ignore victory-vendor -- nps clean",
    // },

    // TODO: IMPLEMENT BUILD
    // "babel-es":
    //   "cross-env BABEL_ENV=es babel src --out-dir es --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js --source-maps",
    // "babel-lib":
    //   "cross-env BABEL_ENV=commonjs babel src --out-dir lib --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js --source-maps",
    // "babel-es-watch": "nps babel-es -- -- --watch",
    // "babel-lib-watch": "nps babel-lib -- -- --watch",
    // "build-es": npsUtils.series.nps("clean.es", "babel-es", "types.es"),
    // "build-lib": npsUtils.series.nps("clean.lib", "babel-lib", "types.lib"),
    // "build-libs": npsUtils.series.nps("build-lib", "build-es"),
    // "build-package-libs-core": `lerna exec --concurrency ${CONCURRENCY} --stream --ignore victory-native --ignore victory-vendor -- nps build-libs`,
    // "build-package-libs-vendor":
    //   "lerna exec --scope victory-vendor -- pnpm build",
    // "build-package-libs": npsUtils.series.nps(
    //   "build-package-libs-vendor",
    //   "build-package-libs-core",
    // ),
    // "build-dist-dev":
    //   "webpack --bail --config ../../config/webpack/webpack.config.dev.js",
    // "build-dist-min":
    //   "webpack --bail --config ../../config/webpack/webpack.config.js",
    // "build-dists": npsUtils.concurrent.nps("build-dist-min", "build-dist-dev"),
    // "build-dist": npsUtils.series.nps("clean.dist", "build-dists"),
    // "build-package-dists": `lerna exec --concurrency ${CONCURRENCY} --stream --ignore victory-native --ignore victory-vendor -- nps build-dists`,

    // TODO REMOVE
    // "lerna-dry-run":
    // "lerna version --no-git-tag-version --no-push --loglevel silly",
    // bootstrap: "lerna bootstrap",
    // "link-parent-bin": "link-parent-bin",
  },
};
