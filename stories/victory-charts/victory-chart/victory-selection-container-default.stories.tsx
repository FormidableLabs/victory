import React from "react";
import type { Meta } from "../../utils/types";

import {
  VictoryChart,
  VictoryScatter,
  VictorySelectionContainer,
  VictoryTheme,
} from "victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

// Dragging a box selects the points inside it; a click clears the selection.
export const VictorySelectionContainerDefault: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        containerComponent={<VictorySelectionContainer />}
      >
        <VictoryScatter
          data={getData(10)}
          size={5}
          style={{
            data: { fill: ({ active }) => (active ? "tomato" : "gray") },
          }}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
