import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const BackgroundStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "Even if we leave blank arrays",
              "for style or lineHeight,",
              "Victory will save us with defaults.",
            ]}
            lineHeight={[]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
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
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            dy={({ datum }) => (datum.y > 0 ? -5 : 8)}
            verticalAnchor="end"
            backgroundPadding={{ top: 5, right: 5, bottom: 5, left: 5 }}
            backgroundStyle={{ fill: "plum", stroke: "#000000" }}
            text={[
              "Victory is awesome.",
              "background styles",
              "work with dy functions",
            ]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            dx={({ datum }) => (datum.y > 0 ? -5 : 8)}
            verticalAnchor="end"
            backgroundPadding={{ top: 5, right: 5, bottom: 5, left: 5 }}
            backgroundStyle={{ fill: "thistle", stroke: "#000000" }}
            text={[
              "Victory is awesome.",
              "background styles",
              "work with dx functions",
            ]}
          />
        }
      />
    </>
  ),
};

export default meta;
