import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getRandomValues, getValues } from "../../utils/data";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const TickValues: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={getValues(5)}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        tickValues={getValues(5)}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={getRandomValues(5)}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        tickValues={getRandomValues(5)}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        tickValues={["one", "two", "three", "four", "five"]}
      />
    </>
  ),
};

export default meta;
