import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const Offsets: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        offsetX={250}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        offsetY={250}
      />
    </>
  ),
};

export default meta;
