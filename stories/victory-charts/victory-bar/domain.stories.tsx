import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Domain: Story = {
  args: {
    data: getData(7),
  },
  render: (props) => (
    <>
      <VictoryBar domain={{ x: [0, 5], y: [0, 8] }} />
      <VictoryChart domain={{ x: [0, 5], y: [0, 8] }}>
        <VictoryBar {...props} />
      </VictoryChart>
      <VictoryChart minDomain={{ y: 2 }}>
        <VictoryBar {...props} />
      </VictoryChart>
      <VictoryChart maxDomain={{ x: 4 }}>
        <VictoryBar {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
