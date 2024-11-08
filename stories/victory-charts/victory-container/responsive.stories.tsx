import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryContainer,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryContainer> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryContainer",
};

export const Responsive: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine />
        <VictoryLabel x={50} y={20} text="default responsive={true}" />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        containerComponent={<VictoryContainer {...props} responsive={false} />}
      >
        <VictoryLine />
        <VictoryLabel x={50} y={20} text={`responsive={false}`} />
      </VictoryChart>
    </>
  ),
};

export default meta;
