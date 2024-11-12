import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const ConstrainToVisibleArea: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            constrainToVisibleArea
            centerOffset={{
              y: ({ datum }) => (datum.y > 0 ? -40 : 40),
              x: ({ datum }) => (datum.y > 0 ? -20 : 20),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={`constrain\nto\nvisible\narea`}
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
            constrainToVisibleArea
            centerOffset={{
              y: ({ datum }) => (datum.y > 0 ? -60 : 60),
              x: ({ datum }) => (datum.y > 0 ? -10 : 10),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={`constrain to\nvisible area`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            constrainToVisibleArea
            centerOffset={{
              x: ({ datum }) => (datum.y > 0 ? 70 : -70),
              y: ({ datum }) => (datum.y > 0 ? -10 : 10),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={`constrain to\nvisible area`}
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
            constrainToVisibleArea
            centerOffset={{
              x: ({ datum }) => (datum.y > 0 ? 70 : -70),
              y: ({ datum }) => (datum.y > 0 ? -10 : 10),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={`constrain\nto\nvisible\narea`}
          />
        }
      />
    </>
  ),
};

export default meta;
