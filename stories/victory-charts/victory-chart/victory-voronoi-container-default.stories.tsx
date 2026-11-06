import React from "react";
import type { Meta } from "../../utils/types";

import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

// Hovering near a point shows its tooltip and makes it bigger.
export const VictoryVoronoiContainerDefault: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryScatter
          data={getData(8)}
          size={({ active }) => (active ? 8 : 4)}
          labels={({ datum }) => `x: ${datum.x}, y: ${datum.y.toFixed(1)}`}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
