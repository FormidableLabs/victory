import { configure } from '@storybook/react';
import React from "react";
import 'react-chromatic/storybook-addon';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: "Victory",
  url: "https://formidable.com/open-source/victory",
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  sortStoriesByKind: true,
  hierarchySeparator: /\./
});

function loadStories() {
  require("../stories/victory-pie");
}

configure(loadStories, module);
