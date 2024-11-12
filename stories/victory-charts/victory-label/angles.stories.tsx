import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const Angles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            angle={45}
            verticalAnchor="middle"
            text={["middle", "middle", "anchors"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            angle={45}
            textAnchor="start"
            text={["start", "end", "anchors"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            angle={45}
            textAnchor="end"
            verticalAnchor="start"
            text={["end", "start", "anchors"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            angle={-45}
            verticalAnchor="middle"
            text={["middle", "middle", "anchors"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            angle={-45}
            textAnchor="start"
            text={["start", "end", "anchors"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            angle={-45}
            textAnchor="end"
            verticalAnchor="start"
            text={["end", "start", "anchors"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
    </>
  ),
};

export default meta;
