import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme, VictoryTooltip } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const Tooltips: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        radius={100}
        labels={["one", "two", "three labels", "four"]}
        labelPlacement="perpendicular"
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        radius={100}
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="startAngle"
        labelPlacement="perpendicular"
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="endAngle"
        labelPlacement="perpendicular"
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="startAngle"
        labelPlacement="parallel"
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="endAngle"
        labelPlacement="parallel"
        labelComponent={<VictoryTooltip active />}
      />
    </>
  ),
};

export default meta;
