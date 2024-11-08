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
      sort: 'alpha'
    },
  },
};

export default preview;
