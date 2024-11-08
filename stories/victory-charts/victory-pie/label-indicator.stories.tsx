import React from "react";
import type { Meta } from "@storybook/react";

import { LineSegment, VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const LabelIndicator: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labelIndicator
      />

      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labelIndicator
        radius={90}
        labelRadius={100}
        labelIndicatorInnerOffset={25}
        labelIndicatorOuterOffset={4}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        innerRadius={50}
        labelIndicator
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        innerRadius={50}
        labelIndicator
        labelIndicatorInnerOffset={25}
        labelIndicatorOuterOffset={10}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        innerRadius={50}
        labelIndicator={<LineSegment />}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labelRadius={90}
        innerRadius={50}
        radius={75}
        labelIndicator={
          <LineSegment
            style={{
              stroke: "red",
              strokeDasharray: 1,
              strokeWidth: 2,
              fill: "none",
            }}
          />
        }
      />
    </>
  ),
};

export default meta;
