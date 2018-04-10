import { configure, addDecorator, storiesOf, setAddon } from '@storybook/react';
import React from "react";
import 'react-chromatic/storybook-addon';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import { withConsole } from '@storybook/addon-console';
import { withInfo } from '@storybook/addon-info';

setOptions({
  name: "Victory",
  url: "https://formidable.com/open-source/victory",
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: true,
  downPanelInRight: true,
  sortStoriesByKind: true
});

const storyWrapper = story => {
  return <div style={{ maxWidth: "50%" }}>{story()}</div>;
};

addDecorator(storyWrapper)

addDecorator((storyFn, context) => {
  return withInfo({
    inline: true,
    header: false,
    source: true,
    maxPropsIntoLine: 1,
    propTables: false
  })(storyFn)(context);
});

addDecorator((storyFn, context) => {
  return withConsole()(storyFn)(context);
});

function loadStories() {
  require("../stories/victory-bar");
}

configure(loadStories, module);
