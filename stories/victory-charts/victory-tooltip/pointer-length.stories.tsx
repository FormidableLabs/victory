import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const PointerLength: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ x: ({ index }) => (index === 0 ? -20 : 0) }}
            pointerLength={30}
            text={`pointerLength\n30`}
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
            pointerLength={30}
            centerOffset={{ y: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerLength\n30`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            pointerLength={30}
            centerOffset={{ x: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerLength\n30`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ x: ({ index }) => (Number(index) < 2 ? 20 : 0) }}
            pointerLength={({ text }) => (text === "short" ? 1 : 30)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long ")}
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
            pointerLength={({ text }) => (text === "short" ? 1 : 30)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long ")}
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
            pointerLength={({ text }) => (text === "short" ? 1 : 30)}
            text={({ index }) => (Number(index) > 2 ? "short" : "long ")}
          />
        }
      />
    </>
  ),
};

export default meta;
