// TypeScript 7.0 has no stable JS API (only `typescript/unstable/*`). These
// tools import `typescript`, so give them their own 6.0 instead of the root's
// 7.0 (which runs `tsc` for types:check). rolldown-plugin-dts writes our
// declarations; the others are website and Storybook tools. A pnpm override
// can't do this: it changes a peer's range, but the peer still resolves to the
// root's copy. Remove once rolldown-plugin-dts uses the tsgo generator (TS 7.1).
const TS_API_USERS = new Set([
  "rolldown-plugin-dts",
  "cosmiconfig",
  "react-docgen-typescript",
  "fork-ts-checker-webpack-plugin",
]);

module.exports = {
  hooks: {
    readPackage(pkg) {
      if (TS_API_USERS.has(pkg.name) && pkg.peerDependencies?.typescript) {
        delete pkg.peerDependencies.typescript;
        delete pkg.peerDependenciesMeta?.typescript;
        pkg.dependencies = { ...pkg.dependencies, typescript: "6.0.3" };
      }
      return pkg;
    },
  },
};
