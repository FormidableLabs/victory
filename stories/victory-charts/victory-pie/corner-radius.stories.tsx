import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const CornerRadius: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        cornerRadius={10}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        cornerRadius={10}
        innerRadius={100}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        cornerRadius={({ datum }) => datum.x * 5}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        cornerRadius={({ datum }) => datum.r}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5, r: 15 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
    </>
  ),
};

export default meta;
