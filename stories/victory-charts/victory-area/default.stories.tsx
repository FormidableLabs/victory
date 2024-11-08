import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryArea, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <VictoryChart
      theme={VictoryTheme[props.themeKey]}
      height={props.height}
      width={props.width}
    >
      <VictoryArea {...props} />
    </VictoryChart>
  ),
};

export default meta;
