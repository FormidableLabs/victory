/**
 * We generally use `nps` for scripts that we:
 * 1. define at the root of the monorepo
 * 2. that are meant to execute _within_ a workspace
 *
 * ... or ...
 *
 * - That could use a little JS magic that we don't want to write a full
 *   node script for 😂
 *
 * For more cases, if you have an actual root task, define it in root
 * `package.json:scripts`.
 */

// For publishing, use the core package's version.
const coreVersion = require("./packages/victory-core/package.json").version;
if (!coreVersion) {
  throw new Error("Unable to read core version");
}
const coreTag = `v${coreVersion}`;

module.exports = {
  scripts: {
    // Root tasks.
    // Try to find an existing tag (from previous attempts, etc.), and if not, create one.
    "git:tag": `git show-ref ${coreTag} || git tag -a ${coreTag} -m \"Version ${coreVersion}\"`,

    // Build.
    // - Libraries
    "build:lib:esm":
      "cross-env BABEL_ENV=es babel src --out-dir es --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js",
    "build:lib:cjs":
      "cross-env BABEL_ENV=commonjs babel src --out-dir lib --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js",
    // - UMD distributions
    // TODO(2375): Add / verify caching
    // https://github.com/FormidableLabs/victory/issues/2375
    "build:dist:dev":
      "webpack --bail --config ../../config/webpack/webpack.config.dev.js",
    "build:dist:min":
      "webpack --bail --config ../../config/webpack/webpack.config.js",

    // Quality.
    // - Format
    // TODO(2375): Can we cache / incremental?
    // https://github.com/FormidableLabs/victory/issues/2375
    "format:pkg":
      'prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore --list-different "./**/*.{js,jsx,json,ts,tsx}"',
    "format:pkg:fix":
      'prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore --write "./**/*.{js,jsx,json,ts,tsx}"',
    "format:root":
      'prettier --list-different "./*.js*" "./{scripts,config,demo,docs,stories,test}/*.{js,jsx,json,ts,tsx}"',
    "format:root:fix":
      'prettier --write "./*.js*" "./{scripts,config,demo,docs,stories,test}/*.{js,jsx,json,ts,tsx}"',

    // - TypeScript
    // TODO(2375): Can we cache / incremental?
    // https://github.com/FormidableLabs/victory/issues/2375
    // Check for errors (includes test files):
    "types:pkg:check": "tsc --pretty --noEmit",
    // To create types, we must do the following:
    // 1. Copy all *.d.ts files to the es folder
    // 2. Compile all *.ts files to the es folder
    // 3. Copy all output from the es folder to the lib folder
    "types:pkg:create":
      "nps types:pkg:copy types:pkg:compile types:pkg:cjs-copy",
    "types:pkg:copy": 'cpx "src/**/*.d.ts" es',
    "types:pkg:compile":
      "tsc --pretty -p ./tsconfig.build.json --emitDeclarationOnly --rootDir src --outDir es || nps types:warning",
    "types:warning":
      'echo "Warning: found TypeScript errors during build. Continuing anyway!"',
    "types:pkg:cjs-copy": 'cpx "es/**/*{.d.ts,.d.ts.map}" lib',
  },
};
