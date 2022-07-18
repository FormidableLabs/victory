/**
 * Workspace scripts.
 *
 * We only use `nps` for scripts that we:
 * 1. define at the root of the monorepo
 * 2. that are meant to execute _within_ a workspace
 *
 * If you have an actual root task, define it in root `package.json:scripts`.
 */

const path = require("path");
const PKG_SRC = path.resolve("src");

module.exports = {
  scripts: {
    // Build.
    // - Libraries
    "build:lib:esm":
      "cross-env BABEL_ENV=es babel src --out-dir es --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js --source-maps",
    "build:lib:cjs":
      "cross-env BABEL_ENV=commonjs babel src --out-dir lib --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js --source-maps",
    // - UMD distributions
    // TODO(wireit): Add caching
    "build:dist:dev":
      "webpack --bail --config ../../config/webpack/webpack.config.dev.js",
    "build:dist:min":
      "webpack --bail --config ../../config/webpack/webpack.config.js",

    // Quality.
    // - Format
    // TODO(wireit): Can we cache / incremental?
    // TODO(wireit): Implement a full `*:fix` for all packages and root to expose as root `pnpm run format:fix`
    "format:pkg":
      'prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore --list-different "./**/*.{js,jsx,json,ts,tsx}"',
    "format:pkg:fix":
      'prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore --write "./**/*.{js,jsx,json,ts,tsx}"',
    "format:root":
      'prettier --list-different "./*.js*" "./{scripts,config,demo,docs,stories,test}/*.{js,jsx,json,ts,tsx}"',
    "format:root:fix":
      'prettier --write "./*.js*" "./{scripts,config,demo,docs,stories,test}/*.{js,jsx,json,ts,tsx}"',

    // - Lint
    // TODO(wireit): Implement a full `*:fix` for all packages and root to expose as root `pnpm run lint:fix`
    "lint:base": "eslint --cache --color",
    "lint:pkg": 'nps "lint:base src"',
    "lint:pkg:fix": 'nps "lint:base --fix src"',

    // Tests
    // - Jest
    // TODO(wireit): Can we cache / incremental?
    "jest:native": `cross-env BABEL_ENV=commonjs jest --config=../../jest-native-config.js --testPathPattern=${PKG_SRC}`,
    "jest:pkg": `cross-env BABEL_ENV=commonjs jest --config=../../jest-config.js --passWithNoTests --testPathPattern=${PKG_SRC}`,
    // TODO(2348): Hook coverage up to CI
    // https://github.com/FormidableLabs/victory/issues/2348
    // TODO(wireit): Add this to `check:ci`
    "jest:cov": "echo TODO",

    // - TypeScript
    // Check for errors (includes test files):
    "types:pkg:check": "tsc --pretty --noEmit",
    // To create types, we must do the following:
    // 1. Copy all *.d.ts files to the es folder
    // 2. Compile all *.ts files to the es folder
    // 3. Copy all output from the es folder to the lib folder
    "types:pkg:create":
      "nps types:pkg:copy types:pkg:compile types:pkg:cjs-copy",
    "types:pkg:copy": "cpx 'src/**/*.d.ts' es",
    "types:pkg:compile":
      "tsc --pretty -p ./tsconfig.build.json --emitDeclarationOnly --rootDir src --outDir es || nps types:warning",
    "types:warning":
      'echo "Warning: found TypeScript errors during build. Continuing anyway!"',
    "types:pkg:cjs-copy": "cpx 'es/**/*{.d.ts,.d.ts.map}' lib",

    // TODO(wireit): Implement all watches.
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
  },
};
