import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryTheme } from "@/victory";

import { getRandomValues, getTimeValues, getValues } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const FixLabelOverlap: Story = {
  args: {
    fixLabelOverlap: true,
  },
  render: (props) => (
    <>
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={getValues(30)}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        tickValues={getValues(30)}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={getRandomValues(30)}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        tickValues={getRandomValues(30)}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        scale="time"
        tickValues={getTimeValues(30)}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        scale="time"
        tickValues={getTimeValues(30)}
      />
    </>
  ),
};

export default meta;
