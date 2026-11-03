// Shared build config for the `victory-*` packages. Each package runs
// `tsdown -c ../../tsdown.config.mts` from its own directory, so paths here are
// relative to the package. (`victory-vendor` has its own build.)
import { defineConfig } from "tsdown";

export default defineConfig({
  // `-c` would otherwise resolve paths from this file's directory.
  cwd: process.cwd(),
  entry: ["src/index.ts*"],
  format: ["esm", "cjs"],
  // One output file per source file, so bundlers can drop unused modules
  // (`sideEffects: false`) and the output reads like the source.
  unbundle: true,
  // `.mjs`/`.cjs` with `.d.mts`/`.d.cts`, without `"type": "module"`.
  fixedExtension: true,
  // Keep `exports.default` in CJS (what the `.d.cts` files describe), rather
  // than `module.exports =` for modules whose only export is a default.
  cjsDefault: false,
  platform: "neutral",
  target: "es2022",
  tsconfig: "tsconfig.build.json",
  dts: { sourcemap: false },
  sourcemap: false,
  exports: true,
  outputOptions: {
    // lodash has no `exports` map, so Node's ESM loader needs the extension
    // (`lodash/isPlainObject.js`).
    paths: (id) => (/^lodash\/[^./]+$/.test(id) ? `${id}.js` : id),
  },
});
