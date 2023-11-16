const {
  default: changelogFunctions,
} = require("@svitejs/changesets-changelog-github-compact");

const customFunctions = {
  ...changelogFunctions,
  getDependencyReleaseLine: async () => "",
};

module.exports = {
  ...customFunctions,
  default: customFunctions,
};
