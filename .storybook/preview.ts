import { Preview } from "@storybook/react";

import "./preview.css";

const preview: Preview = {
  args: {
    height: 350,
    themeKey: "grayscale",
    width: 400,
  },
  parameters: {
    controls: {
      // exclude props where we can't render a workable
      // control for changing the value
      exclude: [
        "containerComponent",
        "dataComponent",
        "groupComponent",
        "labelComponent",
        "labels",
        "theme"
      ],
      sort: 'alpha'
    },
  },
};

export default preview;
