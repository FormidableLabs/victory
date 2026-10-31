import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryChart,
  VictoryVoronoi,
  VictoryTooltip,
  VictoryTheme,
} from "@/victory";

import { sampleDataWithLabels } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const Tooltips: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <>
      <VictoryChart
        domain={{ x: [0, 5], y: [0, 7] }}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryVoronoi
          data={sampleDataWithLabels}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
