import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const Style: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis
          {...props}
          label="Label"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 20, padding: 30 },
            grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 15, padding: 5 },
          }}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
