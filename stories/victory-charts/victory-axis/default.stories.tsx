import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} />
      <VictoryChart theme={VictoryTheme[props.themeKey]} domain={[-1, 1]} />
      <VictoryChart />
      <VictoryChart domain={[-1, 1]} />
    </>
  ),
};

export default meta;
