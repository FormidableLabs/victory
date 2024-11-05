import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const AxisAngle: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={315}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        endAngle={180}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={315}
        endAngle={180}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
    </>
  ),
};

export default meta;
