import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const PointerWidth: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            pointerWidth={20}
            centerOffset={{ x: ({ index }) => (index === 0 ? -20 : 0) }}
            text={`pointerWidth\n20`}
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
            pointerWidth={20}
            centerOffset={{ y: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerWidth\n20`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            pointerWidth={20}
            centerOffset={{ x: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerWidth\n20`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ x: ({ index }) => (Number(index) < 2 ? -20 : 0) }}
            pointerWidth={({ text }) => (text === "skinny" ? 0 : 20)}
            text={({ datum }) => (datum.y < 0 ? "skinny" : "wide ")}
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
            centerOffset={{ y: ({ index }) => (Number(index) < 2 ? 20 : 0) }}
            pointerWidth={({ text }) => (text === "skinny" ? 0 : 20)}
            text={({ datum }) => (datum.y < 0 ? "skinny" : "wide ")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{
              x: ({ index }) => (index === 0 || index === 4 ? 20 : 0),
            }}
            pointerWidth={({ text }) => (text === "skinny" ? 0 : 20)}
            text={({ index }) => (Number(index) > 2 ? "skinny" : "wide ")}
          />
        }
      />
    </>
  ),
};

export default meta;
