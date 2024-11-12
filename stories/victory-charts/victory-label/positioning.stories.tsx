import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const Positioning: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel {...props} x={100} text="x = 100" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel {...props} y={100} text="y = 100" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel {...props} dx={50} text="dx = 50" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel {...props} dy={50} text="dy = 50" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            dx={({ datum }) => datum.x + 50}
            text="dx function"
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            dy={({ datum }) => datum.x - 20}
            text="dy function"
          />
        }
      />
    </>
  ),
};

export default meta;
