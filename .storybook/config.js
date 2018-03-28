import { configure } from '@storybook/react';
import 'react-chromatic/storybook-addon';


function loadStories() {
  require("../stories/victory-pie");
}

configure(loadStories, module);
