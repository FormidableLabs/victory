import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBrushContainer, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const VictoryBrushContainerWithDomainHorizontal: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        containerComponent={
          <VictoryBrushContainer brushDomain={{ x: [0, 0.5], y: [0.5, 1] }} />
        }
      />
    </>
  ),
};

export default meta;
