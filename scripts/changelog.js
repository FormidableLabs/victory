const {
  default: changelogFunctions,
} = require("@svitejs/changesets-changelog-github-compact");

const customFunctions = {
  ...changelogFunctions,
  // Keep a blank line between entries (1.x writes tight lists).
  getReleaseLine: async (...args) =>
    `\n${await changelogFunctions.getReleaseLine(...args)}`,
  getDependencyReleaseLine: async () => "",
};

module.exports = {
  ...customFunctions,
  default: customFunctions,
};
