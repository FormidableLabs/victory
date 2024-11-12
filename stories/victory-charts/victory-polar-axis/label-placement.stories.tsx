import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const LabelPlacement: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labelPlacement="parallel"
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        labelPlacement="parallel"
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labelPlacement="perpendicular"
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        labelPlacement="perpendicular"
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labelPlacement="vertical"
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        labelPlacement="vertical"
      />
    </>
  ),
};

export default meta;
