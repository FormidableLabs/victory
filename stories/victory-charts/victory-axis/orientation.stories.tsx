import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryChart, VictoryTheme } from "@/victory";

import { getValues } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const Orientation: Story = {
  args: {
    tickValues: getValues(5),
  },
  render: (props) => (
    <>
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        orientation="top"
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        orientation="bottom"
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        orientation="left"
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        orientation="right"
      />
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} orientation="top" />
        <VictoryAxis {...props} dependentAxis orientation="right" />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} orientation="top" invertAxis />
        <VictoryAxis {...props} dependentAxis orientation="right" invertAxis />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domain={[-5, 5]}>
        <VictoryAxis {...props} orientation="top" />
        <VictoryAxis {...props} dependentAxis orientation="right" />
      </VictoryChart>
    </>
  ),
};

export default meta;
