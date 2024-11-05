import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const GetPath: Story = {
  args: {},
  render: (props) => {
    const verticalPathFn = (callbackArgs) => {
      const { x0, x1, y0, y1 } = callbackArgs;
      return `M ${x0}, ${y0}
      L ${(x1 + x0) / 2}, ${y1}
      L ${x1}, ${y0}
      z`;
    };

    const horizontalPathFn = (callbackArgs) => {
      const { x0, x1, y0, y1 } = callbackArgs;
      return `M ${x0}, ${y1}
      L ${x1}, ${(y0 + y1) / 2}
      L ${x0}, ${y0}
      z`;
    };

    return (
      <>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram {...props} data={data} getPath={verticalPathFn} />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryHistogram {...props} data={data} getPath={horizontalPathFn} />
        </VictoryChart>
      </>
    );
  },
};

export default meta;
