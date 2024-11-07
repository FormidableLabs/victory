import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const Axes: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis dependentAxis />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryAxis orientation="top" />
        <VictoryAxis dependentAxis />
        <VictoryAxis dependentAxis orientation="right" />
      </VictoryChart>
    </>
  ),
};

export default meta;
