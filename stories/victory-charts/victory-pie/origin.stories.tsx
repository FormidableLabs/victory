import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const Origin: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        origin={{ x: 150, y: 150 }}
        labelRadius={100}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        origin={{ x: 150, y: 150 }}
        labelRadius={100}
        endAngle={90}
        startAngle={-90}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        origin={{ x: 200, y: 0 }}
        labelRadius={100}
        startAngle={-270}
        endAngle={-90}
      />
    </>
  ),
};

export default meta;
