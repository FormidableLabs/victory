import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryChart, VictoryVoronoi, VictoryTheme } from "@/victory";

import { sampleData } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const Styles: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <VictoryChart
      domain={{ x: [0, 5], y: [0, 7] }}
      theme={VictoryTheme[props.themeKey]}
    >
      <VictoryVoronoi
        data={sampleData}
        style={{
          data: {
            stroke: "#ffffff",
            strokeWidth: 2,
            fill: "#2299ff",
            fillOpacity: 0.7,
          },
        }}
      />
    </VictoryChart>
  ),
};

export default meta;
