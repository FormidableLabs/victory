import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const LabelRadius: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        labelRadius={100}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.y}
        radius={80}
        innerRadius={100}
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150 },
          { x: 4, y: 120 },
          { x: 5, y: 130 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.r}
        innerRadius={100}
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150, r: 80 },
          { x: 4, y: 120 },
          { x: 5, y: 130 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.r}
        innerRadius={100}
        labelPosition="startAngle"
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150, r: 80 },
          { x: 4, y: 120 },
          { x: 5, y: 130 },
        ]}
      />
    </>
  ),
};

export default meta;
