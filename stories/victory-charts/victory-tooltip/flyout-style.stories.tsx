import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const FlyoutStyle: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            style={{ padding: 5, fontFamily: "arial" }}
            flyoutStyle={{
              stroke: "red",
              strokeWidth: 2,
              strokeDasharray: "1, 2",
            }}
            text={`flyoutStyle`}
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
            style={{ padding: 5, fill: "red", fontFamily: "arial" }}
            flyoutStyle={{
              fill: "pink",
              strokeWidth: 0,
              opacity: 0.5,
              padding: 10,
            }}
            text={`flyoutStyle`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            style={{ padding: 10, fontFamily: "arial" }}
            flyoutStyle={{ fill: "cyan", strokeWidth: 0, opacity: 0.5 }}
            text={`flyoutStyle\npolar`}
          />
        }
      />
    </>
  ),
};

export default meta;
