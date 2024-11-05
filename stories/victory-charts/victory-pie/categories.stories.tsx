import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const Categories: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        categories={{ x: ["B", "A", "E", "C", "D"] }}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        categories={{ x: ["E", "C", "A", "D", "B"] }}
      />
    </>
  ),
};

export default meta;
