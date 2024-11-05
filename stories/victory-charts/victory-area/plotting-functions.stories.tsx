import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryArea, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const PlottingFunctions: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>

      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          y={(d) => Math.sin(Math.PI * d.x)}
          y0={(d) => Math.sin(Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
