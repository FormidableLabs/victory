const { default: changelogFunctions } = require("@changesets/changelog-github");

const customFunctions = {
  ...changelogFunctions,
  // Every package is in one `fixed` group, so each release would list its
  // sibling bumps as "Updated dependencies" in every changelog.
  getDependencyReleaseLine: async () => "",
};

module.exports = {
  ...customFunctions,
  default: customFunctions,
};
