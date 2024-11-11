import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryBar, VictoryChart } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const Orientations: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        padding={{ left: 20, right: 30, top: 15, bottom: 40 }}
      >
        <VictoryAxis tickValues={[1, 2, 3, 4, 5]} />
        <VictoryAxis
          orientation="left"
          dependentAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8]}
        />
        <VictoryAxis
          orientation="right"
          dependentAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 7 },
            { x: 3, y: 4 },
            { x: 4, y: 5 },
            { x: 5, y: 2 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
