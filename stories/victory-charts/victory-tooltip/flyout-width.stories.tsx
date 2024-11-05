import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const FlyoutWidth: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutWidth={100}
            text={`flyoutWidth\n100`}
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
            flyoutWidth={100}
            text={`flyoutWidth\n100`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutWidth={100}
            text={`flyoutWidth\n100`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutWidth={({ text }) => (text === "short" ? 35 : 100)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long")}
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
            flyoutWidth={({ text }) => (text === "short" ? 35 : 100)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            flyoutWidth={({ text }) => (text === "short" ? 35 : 100)}
            text={({ index }) => (Number(index) > 2 ? "short" : "long")}
          />
        }
      />
    </>
  ),
};

export default meta;
