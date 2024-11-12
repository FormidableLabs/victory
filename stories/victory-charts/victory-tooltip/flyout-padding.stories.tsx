import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const FlyoutPadding: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutPadding={{ top: 20, left: 15, right: 5 }}
            text={`flyoutPadding`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutPadding={{ top: 30, bottom: 10 }}
            text={`flyoutPadding\nhorizontal`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutPadding={({ datum }) =>
              datum.y > 0 ? { top: 20, left: 15, right: 5 } : 2
            }
            text={`flyoutPadding\nfunction`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutPadding={{ top: 20, left: 15, right: 5 }}
            text={`flyoutPadding\npolar`}
          />
        }
      />
    </>
  ),
};

export default meta;
