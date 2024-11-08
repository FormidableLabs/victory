import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={<VictoryTooltip {...props} active />}
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={<VictoryTooltip {...props} active />}
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={<VictoryTooltip {...props} active />}
      />
    </>
  ),
};

export default meta;
