import { configure } from "@kadira/storybook";

// Consider generalizing this so that this can be a part of the archetype:
// https://github.com/kadirahq/react-storybook/blob/master/docs/
// configure_storybook.md#loading-modules

function loadStories() {
  require("../stories/victory-pie");
}

configure(loadStories, module);
