import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const InnerRadius: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        innerRadius={100}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.radius - 20}
        data={[
          { x: 1, y: 1, radius: 110 },
          { x: 2, y: 3, radius: 120 },
          { x: 3, y: 5, radius: 140 },
          { x: 4, y: 2, radius: 150 },
          { x: 5, y: 3, radius: 130 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        innerRadius={({ datum }) => datum.y + 10}
        labelRadius={({ datum }) => datum.y - 20}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 25 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        innerRadius={({ datum }) => datum.radius}
        data={[
          { x: 1, y: 1, radius: 50 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
    </>
  ),
};

export default meta;
