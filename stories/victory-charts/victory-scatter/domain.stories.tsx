import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryScatter, VictoryChart } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const Domain: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter {...props}
        data={getData(5)}
       
        domain={{ x: [0, 4], y: [5, 10] }}
      />
      <VictoryChart minDomain={{ x: 3 }}>
        <VictoryScatter {...props} data={getData(5)} />
      </VictoryChart>
      <VictoryChart maxDomain={{ y: 5 }}>
        <VictoryScatter {...props} data={getData(5)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
