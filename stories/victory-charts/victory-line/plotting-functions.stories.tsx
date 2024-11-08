import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLine, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const PlottingFunctions: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine {...props} y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryLine {...props} y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>

      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryLine {...props} y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          y={(d) => Math.sin(Math.PI * d.x)}
          y0={(d) => Math.sin(Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
