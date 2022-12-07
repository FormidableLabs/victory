const { config } = require('dotenv');
const { getReleaseLine } = require('@svitejs/changesets-changelog-github-compact');

config();

const changelogFunctions = {
  // Dependencies are updated on every changeset for every package, so
  // remove them to reduce noise.
  getDependencyReleaseLine: () => '',
  getReleaseLine
};

module.exports = {
  ...changelogFunctions,
  default: changelogFunctions
};
