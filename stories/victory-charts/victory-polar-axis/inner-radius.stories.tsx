import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getValues } from "../../utils/data";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const InnerRadius: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart polar innerRadius={50}>
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          dependentAxis
          tickValues={getValues(5)}
        />
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          tickValues={getValues(5)}
        />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} endAngle={180}>
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          dependentAxis
          tickValues={getValues(5)}
        />
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          tickValues={getValues(5)}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
