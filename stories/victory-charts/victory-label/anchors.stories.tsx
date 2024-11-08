import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const Anchors: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="end"
            verticalAnchor="end"
            text={["textAnchor: end", "with", "verticalAnchor: end"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="end"
            verticalAnchor="middle"
            text={["textAnchor: end", "with", "verticalAnchor: middle"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="end"
            verticalAnchor="start"
            text={["textAnchor: end", "with", "verticalAnchor: start"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="middle"
            verticalAnchor="end"
            text={["textAnchor: middle", "with", "verticalAnchor: end"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="middle"
            verticalAnchor="middle"
            text={["textAnchor: middle", "with", "verticalAnchor: middle"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="middle"
            verticalAnchor="start"
            text={["textAnchor: middle", "with", "verticalAnchor: start"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="start"
            verticalAnchor="end"
            text={["textAnchor: start", "with", "verticalAnchor: end"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="start"
            verticalAnchor="middle"
            text={["textAnchor: start", "with", "verticalAnchor: middle"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            textAnchor="end"
            verticalAnchor="start"
            text={["textAnchor: end", "with", "verticalAnchor: start"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
    </>
  ),
};

export default meta;
