import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryChart, VictoryTheme } from "@/victory";

import { getValues } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const AxisValue: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart polar>
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          dependentAxis
          axisValue={1.5}
          tickValues={getValues(3)}
        />
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          tickValues={getValues(5)}
        />
      </VictoryChart>
      <VictoryChart polar>
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          dependentAxis
          axisValue="three"
          tickValues={getValues(3)}
        />
        <VictoryPolarAxis
          {...props}
          theme={VictoryTheme[props.themeKey]}
          tickValues={["one", "two", "three", "four", "five"]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
