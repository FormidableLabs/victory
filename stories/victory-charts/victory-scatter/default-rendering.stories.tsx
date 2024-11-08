import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryScatter, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter {...props} />
      <VictoryChart>
        <VictoryScatter {...props} />
      </VictoryChart>
      <VictoryScatter {...props} theme={VictoryTheme.material} />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryScatter {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
