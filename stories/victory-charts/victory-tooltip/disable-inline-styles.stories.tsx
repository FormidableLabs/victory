import React from "react";
import type { Meta } from "@storybook/react";

import { Flyout, VictoryLabel, VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const DisableInlineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip {...props} active disableInlineStyles />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutComponent={
              <Flyout disableInlineStyles className="fill-purple" />
            }
            labelComponent={
              <VictoryLabel disableInlineStyles className="fill-green" />
            }
          />
        }
      />
    </>
  ),
};

export default meta;
