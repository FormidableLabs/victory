import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const Labels: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labels={["one", "two", "three", "four"]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labels={({ index }) => `#${index}`}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labels={({ index }) => `#${index}`}
        labelPosition="startAngle"
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        labels={({ index }) => `#${index}`}
        labelPosition="endAngle"
      />
    </>
  ),
};

export default meta;
