import React from "react";
import type { Meta } from "../../utils/types";

import { VictoryPolarAxis, VictoryChart, VictoryTheme } from "victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]} />
      <VictoryPolarAxis {...props} theme={VictoryTheme[props.themeKey]} />
    </>
  ),
};

export default meta;
