import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryErrorBar, VictoryChart, VictoryTheme } from "@/victory";

import { getErrorBarData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorBar",
};

export const Theme: Story = {
  args: {
    data: getErrorBarData(5),
  },
  render: (props) => (
    <>
      <VictoryErrorBar {...props} />
      <VictoryChart>
        <VictoryErrorBar {...props} />
      </VictoryChart>
      <VictoryErrorBar {...props} theme={VictoryTheme.material} />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryErrorBar {...props} />
      </VictoryChart>
      <VictoryErrorBar {...props} theme={VictoryTheme.clean} />
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryErrorBar {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
