import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const Inline: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            backgroundStyle={{ fill: "lavender" }}
            verticalAnchor="middle"
            text={["Victory is awesome.", "This is inline styling for labels."]}
            inline
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            inline
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgrounds work with ",
              "multiple lineHeights,",
              "but the positioning does change",
            ]}
            lineHeight={[1, 2, 1, 3]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            inline
            angle={70}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "background rects",
              "all get appropriate",
              "angle transforms",
            ]}
          />
        }
      />
    </>
  ),
};

export default meta;
