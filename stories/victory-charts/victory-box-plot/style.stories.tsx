import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBoxPlot, VictoryChart, VictoryTheme } from "@/victory";

import { getBoxPlotData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const Style: Story = {
  args: {
    data: getBoxPlotData(4),
    domainPadding: 20,
    labels: true,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot
          style={{
            min: { stroke: "#FF530D", strokeWidth: 2 },
            max: { stroke: "#2bbee0", strokeWidth: 2 },
            q1: { fill: "#FF530D", fillOpacity: 0.5 },
            q3: { fill: "#2bbee0", fillOpacity: 0.5 },
            median: { stroke: "#fff", strokeWidth: 2 },
            minLabels: { fill: "#FF530D", padding: 10 },
            maxLabels: { fill: "#2bbee0", padding: 10 },
          }}
          {...props}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBoxPlot
          style={{
            min: { stroke: "#FF530D", strokeWidth: 2 },
            max: { stroke: "#2bbee0", strokeWidth: 2 },
            q1: {
              fill: "#FF530D",
              fillOpacity: ({ datum }) => (datum.q1 < 10 ? 1 : 0.5),
            },
            q3: {
              fill: "#2bbee0",
              fillOpacity: ({ datum }) => (datum.q3 > 15 ? 1 : 0.5),
            },
            median: { stroke: "#fff", strokeWidth: 2 },
            minLabels: { fill: "#FF530D", padding: 10 },
            maxLabels: { fill: "#2bbee0", padding: 10 },
          }}
          {...props}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
