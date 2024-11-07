import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const Theme: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart polar theme={VictoryTheme.grayscale} />
      <VictoryPolarAxis {...props} theme={VictoryTheme.grayscale} />
      <VictoryChart polar theme={VictoryTheme.material} />
      <VictoryPolarAxis {...props} theme={VictoryTheme.material} />
      <VictoryChart polar theme={VictoryTheme.clean} />
      <VictoryPolarAxis {...props} theme={VictoryTheme.clean} />
    </>
  ),
};

export default meta;
