import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryAxis,
  VictoryLegend,
  VictoryChart,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLegend> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLegend",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend {...props} orientation="horizontal" />
      </VictoryChart>
    </>
  ),
};

export default meta;
