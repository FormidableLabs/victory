import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const CornerRadius: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            cornerRadius={10}
            text={`cornerRadius\n10`}
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
            cornerRadius={10}
            text={`cornerRadius\n10`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            cornerRadius={10}
            text={`cornerRadius\n10`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            cornerRadius={({ text }) => (text === "square" ? 0 : 5)}
            text={({ datum }) => (datum.y < 0 ? "square" : "rounded ")}
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
            cornerRadius={({ text }) => (text === "square" ? 0 : 5)}
            text={({ datum }) => (datum.y < 0 ? "square" : "rounded ")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            cornerRadius={({ text }) => (text === "square" ? 0 : 5)}
            text={({ index }) => (Number(index) > 2 ? "square" : "rounded ")}
          />
        }
      />
    </>
  ),
};

export default meta;
