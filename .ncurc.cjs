// npm-check-updates config for `pnpm dep:check` (see CONTRIBUTING.md).
//
// Majors we've deliberately parked. Each one has an item in the uplift
// tracking issue (#3093); remove the entry when that item lands.
const MINOR_ONLY = {
  // Phase 4: develop on React 19, with a CI job on React 18.0.0.
  react: "React 19",
  "react-dom": "React 19",
  "@types/react": "React 19",
  "@types/react-dom": "React 19",
  // TS 7 + tsgo item.
  typescript: "TS 7",
  // Matches `.nvmrc`. Node 26 is checked at the end of the uplift.
  "@types/node": "Node 26",
  // victory-vendor's build stays on Babel 7. Moving it to one build tool is a
  // separate post-uplift ticket; Babel goes then.
  "@babel/cli": "vendor single-tool build",
  "@babel/core": "vendor single-tool build",
  "@babel/plugin-transform-modules-commonjs": "vendor single-tool build",
  // Website: react-live 5 item.
  "react-live": "react-live 5",
};

// Phase 3 replaces Storybook and Chromatic (and `concurrently` with them).
const REMOVED_IN_PHASE_3 = [
  "storybook",
  "@storybook/*",
  "chromatic",
  "@chromatic-com/storybook",
  "concurrently",
];

module.exports = {
  workspaces: true,
  root: true,
  // Skip versions published in the last week.
  cooldown: 7,
  reject: REMOVED_IN_PHASE_3,
  target: (name) => (name in MINOR_ONLY ? "minor" : "latest"),
};
