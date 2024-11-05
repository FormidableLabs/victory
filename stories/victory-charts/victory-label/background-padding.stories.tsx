import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const BackgroundPadding: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as a number",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={10}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an object",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={{ top: 0, bottom: 10, left: 20, right: -10 }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an array",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={[
              { top: 0, bottom: 10, left: 20, right: -10 },
              -5,
              { top: 0, bottom: 10, left: 40, right: -30 },
              20,
            ]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            angle={45}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as a number",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={10}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            angle={45}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an object",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={{ top: 0, bottom: 10, left: 20, right: -10 }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            angle={45}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an array",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={[
              { top: 0, bottom: 10, left: 20, right: -10 },
              -5,
              { top: 0, bottom: 10, left: 40, right: -30 },
              20,
            ]}
          />
        }
      />
    </>
  ),
};

export default meta;
