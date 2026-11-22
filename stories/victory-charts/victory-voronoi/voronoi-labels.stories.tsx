import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryChart, VictoryVoronoi, VictoryTheme } from "@/victory";

import { sampleData, sampleDataWithLabels } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const Labels: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <>
      <VictoryChart
        domain={{ x: [0, 5], y: [0, 7] }}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryVoronoi data={sampleDataWithLabels} />
      </VictoryChart>
      <VictoryChart
        domain={{ x: [0, 5], y: [0, 7] }}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryVoronoi
          data={sampleData}
          labels={({ datum }) => `y: ${datum.y}`}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
