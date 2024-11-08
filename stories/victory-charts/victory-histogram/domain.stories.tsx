import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const Domain: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryHistogram
        {...props}
        data={data}
        domain={{ x: [20, 100], y: [3, 10] }}
      />
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        domain={{ x: [20, 100], y: [3, 10] }}
      >
        <VictoryHistogram {...props} data={data} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} minDomain={{ x: 40 }}>
        <VictoryHistogram {...props} data={data} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} maxDomain={{ y: 4 }}>
        <VictoryHistogram {...props} data={data} />
      </VictoryChart>
    </>
  ),
};

export default meta;
