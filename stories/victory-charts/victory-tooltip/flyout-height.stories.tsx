import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const FlyoutHeight: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutHeight={50}
            text={`flyoutHeight\n50`}
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
            flyoutHeight={50}
            text={`flyoutHeight\n50`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutHeight={50}
            text={`flyoutHeight\n50`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutHeight={({ text }) => (text === "short" ? 20 : 50)}
            text={({ datum }) => (datum.y < 0 ? "short" : "tall")}
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
            flyoutHeight={({ text }) => (text === "short" ? 20 : 50)}
            text={({ datum }) => (datum.y < 0 ? "short" : "tall")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutHeight={({ text }) => (text === "short" ? 20 : 50)}
            text={({ index }) => (Number(index) > 2 ? "short" : "tall")}
          />
        }
      />
    </>
  ),
};

export default meta;
