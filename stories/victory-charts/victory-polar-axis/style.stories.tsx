import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const Style: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{
          axis: { stroke: "#756f6a" },
          axisLabel: { fontSize: 20, padding: 30 },
          grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
          ticks: { stroke: "grey", size: 5 },
          tickLabels: { fontSize: 15, padding: 5 },
        }}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        style={{
          axis: { stroke: "#756f6a" },
          axisLabel: { fontSize: 20, padding: 30 },
          grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
          ticks: { stroke: "grey", size: 5 },
          tickLabels: { fontSize: 15, padding: 5 },
        }}
      />
    </>
  ),
};

export default meta;
