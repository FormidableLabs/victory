import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBoxPlot, VictoryChart, VictoryTheme } from "@/victory";

import { getArrayData, getBoxPlotRepeatData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const Data: Story = {
  args: {
    domainPadding: 20,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot
          data={[
            { type: 1, Min: 1, Max: 18, Median: 8, Q1: 5, Q3: 15 },
            { type: 2, Min: 4, Max: 20, Median: 10, Q1: 7, Q3: 15 },
            { type: 3, Min: 3, Max: 12, Median: 6, Q1: 5, Q3: 10 },
          ]}
          x="type"
          min="Min"
          max="Max"
          median="Median"
          q1="Q1"
          q3="Q3"
          {...props}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBoxPlot
          data={[
            { type: 1, Min: 1, Max: 18, Median: 8, Q1: 5, Q3: 15 },
            { type: 2, Min: 4, Max: 20, Median: 10, Q1: 7, Q3: 15 },
            { type: 3, Min: 3, Max: 12, Median: 6, Q1: 5, Q3: 10 },
          ]}
          x="type"
          min="Min"
          max="Max"
          median="Median"
          q1="Q1"
          q3="Q3"
          {...props}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot data={getArrayData(5, 10)} {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBoxPlot data={getArrayData(5, 10)} {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot data={getBoxPlotRepeatData(5, 10)} {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBoxPlot data={getBoxPlotRepeatData(5, 10)} {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
