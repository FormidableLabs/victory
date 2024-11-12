import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Sorting: Story = {
  args: {
    data: [
      { x: "low", y: 1 },
      { x: "med", y: 2 },
      { x: "high", y: 3 },
    ],
    sortKey: "sort",
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBar {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBar {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
