import { configure } from "@kadira/storybook";

function loadStories() {
  require("../stories/victory-pie");
}

configure(loadStories, module);
