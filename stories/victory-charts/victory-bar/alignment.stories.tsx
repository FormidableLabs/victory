import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryTheme } from "@/victory";

import { getData, getMixedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Alignment: Story = {
  args: {
    data: getData(7),
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} alignment="start" />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} alignment="start" />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} alignment="middle" />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} alignment="middle" />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} alignment="end" />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} alignment="end" />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getMixedData(5)} alignment="start" />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getMixedData(5)} alignment="start" />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getMixedData(5)} alignment="end" />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getMixedData(5)} alignment="end" />
      </VictoryChart>
    </>
  ),
};

export default meta;
