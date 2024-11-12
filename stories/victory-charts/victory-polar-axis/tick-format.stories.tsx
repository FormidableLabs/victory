import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getValues } from "../../utils/data";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const TickFormat: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={getValues(5)}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        tickValues={getValues(5)}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={getValues(5)}
        tickFormat={(t) => `#${t}`}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        axisAngle={45}
        tickValues={getValues(5)}
        tickFormat={(t) => `#${t}`}
      />
    </>
  ),
};

export default meta;
