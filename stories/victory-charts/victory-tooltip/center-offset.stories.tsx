import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const CenterOffset: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ x: 20 }}
            text={`x\noffset`}
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
            centerOffset={{ x: 20 }}
            text={`x\noffset`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ x: 20 }}
            text={`x\noffset`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ y: 20 }}
            text={`y\noffset`}
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
            centerOffset={{ y: 20 }}
            text={`y\noffset`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ y: 20 }}
            text={`y\noffset`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ x: 20, y: 20 }}
            text={`x, y\noffset`}
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
            centerOffset={{ x: 20, y: 20 }}
            text={`x, y\noffset`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ x: 20, y: 20 }}
            text={`x, y\noffset`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{ y: ({ datum }) => (datum.y < 0 ? 10 : -10), x: 10 }}
            text={`function\noffset`}
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
            centerOffset={{
              x: ({ datum }) => (datum.y < 0 ? -10 : 10),
              y: -10,
            }}
            text={`function\noffset`}
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
              y: ({ index }) => (Number(index) < 3 ? -10 : 10),
              x: 10,
            }}
            text={`function\noffset`}
          />
        }
      />
    </>
  ),
};

export default meta;
