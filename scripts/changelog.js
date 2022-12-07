import { getReleaseLine } from '@svitejs/changesets-changelog-github-compact';

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
