import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryChart, VictoryTheme } from "@/victory";

import { getValues } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const WithMultilineLabels: Story = {
  args: {
    tickFormat: (tick) => (tick >= 0 ? tick : `minus\n${-tick}`),
    tickValues: getValues(5, -2),
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} orientation="top" />
      </VictoryChart>
    </>
  ),
};

export default meta;
