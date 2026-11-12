import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryVoronoi,
  VictoryTheme,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "@/victory";

import { sampleDataGroupOne, sampleDataGroupTwo } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const TooltipsGrouped: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <>
      <VictoryChart
        containerComponent={<VictoryVoronoiContainer />}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryGroup
          color="#c43a31"
          labels={({ datum }) => `y: ${datum.y}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
          data={sampleDataGroupOne}
        >
          <VictoryLine />
          <VictoryScatter size={({ active }) => (active ? 8 : 3)} />
        </VictoryGroup>
        <VictoryGroup
          labels={({ datum }) => `y: ${datum.y}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
          data={sampleDataGroupTwo}
        >
          <VictoryLine />
          <VictoryScatter size={({ active }) => (active ? 8 : 3)} />
        </VictoryGroup>
      </VictoryChart>
    </>
  ),
};

export default meta;
