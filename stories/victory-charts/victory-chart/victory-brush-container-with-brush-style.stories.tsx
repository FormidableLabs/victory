import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBrushContainer, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const VictoryBrushContainerWithBrushStyle: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        containerComponent={
          <VictoryBrushContainer
            brushStyle={{ fill: "teal", stroke: "teal", fillOpacity: 0.2 }}
          />
        }
      />
    </>
  ),
};

export default meta;
