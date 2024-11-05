import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme, VictoryTooltip } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const LabelPlacement: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        labelPosition="startAngle"
        labelPlacement="parallel"
        labelRadius={50}
        labels={({ datum }) => `${datum.l} degrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        labelPlacement={({ index }) => (index ? "parallel" : "perpendicular")}
        labelRadius={({ index }) => (index ? 50 : undefined)}
        labels={({ datum }) => `${datum.l} degrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        radius={120}
        labelPosition="startAngle"
        labelPlacement="perpendicular"
        labels={({ datum }) => `${datum.l}\ndegrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{ labels: { fill: "magenta" } }}
        radius={120}
        labelPosition="startAngle"
        labelPlacement="perpendicular"
        labelComponent={<VictoryTooltip active />}
        labels={({ datum }) => `${datum.l}\ndegrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
    </>
  ),
};

export default meta;
