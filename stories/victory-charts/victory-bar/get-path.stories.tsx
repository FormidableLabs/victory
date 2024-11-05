import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const GetPath: Story = {
  args: {
    data: getData(7),
  },
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
          <VictoryBar {...props} getPath={verticalPathFn} />
        </VictoryChart>
        <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
          <VictoryBar {...props} getPath={horizontalPathFn} />
        </VictoryChart>
      </>
    );
  },
};

export default meta;
