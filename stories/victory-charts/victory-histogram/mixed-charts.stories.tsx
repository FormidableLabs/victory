import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryHistogram,
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
} from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const MixedCharts: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data}  />
        <VictoryLine
          data={[
            { x: 0, y: 5 },
            { x: 10, y: 5 },
            { x: 20, y: 2 },
            { x: 30, y: 9 },
            { x: 50, y: 2 },
            { x: 60, y: 4 },
            { x: 80, y: 12 },
            { x: 120, y: 8 },
          ]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data}  />
        <VictoryScatter
          data={[
            { x: 0, y: 5 },
            { x: 10, y: 5 },
            { x: 20, y: 2 },
            { x: 30, y: 9 },
            { x: 50, y: 2 },
            { x: 60, y: 4 },
            { x: 80, y: 12 },
            { x: 120, y: 8 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
