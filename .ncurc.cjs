// npm-check-updates config for `pnpm dep:check` (see CONTRIBUTING.md).
//
// Majors we've deliberately parked. Each one has an item in the uplift
// tracking issue (#3093); remove the entry when that item lands.
const MINOR_ONLY = {
  // victory-vendor's build stays on Babel 7. Moving it to one build tool is a
  // separate post-uplift ticket (#3126); Babel goes then.
  "@babel/cli": "vendor single-tool build",
  "@babel/core": "vendor single-tool build",
  "@babel/plugin-transform-modules-commonjs": "vendor single-tool build",
};

module.exports = {
  workspaces: true,
  root: true,
  // Skip versions published in the last week.
  cooldown: 7,
  target: (name) => (name in MINOR_ONLY ? "minor" : "latest"),
};
