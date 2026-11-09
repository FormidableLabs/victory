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

// Older majors we use on purpose (not parked), by package and major: those
// ranges stay on that major while it's supported. Matched by the real package
// name, which is what ncu passes for an alias (`@types/react-18`).
const SUPPORTED_MAJORS = {
  // `pack:check` type-checks published declarations against React 18's types
  // (root `@types/react-18`); the website stays on React 18.
  "@types/react": ["18"],
};

module.exports = {
  workspaces: true,
  root: true,
  // Skip versions published in the last week.
  cooldown: 7,
  target: (name, [{ major }]) =>
    name in MINOR_ONLY || SUPPORTED_MAJORS[name]?.includes(major)
      ? "minor"
      : "latest",
};
