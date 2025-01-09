import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryChart,
  VictoryArea,
  VictoryVoronoi,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const y0: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <>
      <VictoryChart
        domain={{ y: [1, 8] }}
        containerComponent={<VictoryVoronoiContainer />}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryArea
          style={{
            data: { fill: "tomato" },
            labels: { fill: "tomato" },
          }}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
          data={[
            { x: 1, y: 4 },
            { x: 2, y: 5 },
            { x: 3, y: 7 },
          ]}
          y0={() => 2}
        />
        <VictoryArea
          style={{
            data: { fill: "green" },
            labels: { fill: "tomato" },
          }}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
          ]}
          y0={() => 2}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
