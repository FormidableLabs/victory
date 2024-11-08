import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const Theme: Story = {
  args: {
    data,
  },
  render: (props) => (
    <>
      <VictoryHistogram {...props} />
      <VictoryChart>
        <VictoryHistogram {...props} />
      </VictoryChart>
      <VictoryHistogram {...props} theme={VictoryTheme.material} />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryHistogram {...props} />
      </VictoryChart>
      <VictoryHistogram {...props} theme={VictoryTheme.clean} />
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryHistogram {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
