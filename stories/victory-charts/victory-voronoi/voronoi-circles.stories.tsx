import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoi,
  VictoryScatter,
  VictoryTheme,
} from "@/victory";

import { sampleData } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const Circles: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <>
      <VictoryChart
        domain={{ x: [0, 5], y: [0, 7] }}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryVoronoi data={sampleData} size={50} />
        <VictoryLine data={sampleData} />
        <VictoryScatter data={sampleData} />
      </VictoryChart>
    </>
  ),
};

export default meta;
