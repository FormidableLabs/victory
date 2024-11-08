import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryErrorBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorBar",
};

export const Data: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          data={[
            { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
            { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
            { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
            { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
            { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 },
          ]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          data={[
            { series: 1, value: 9, error: 3 },
            { series: 2, value: 80, error: 4 },
            { series: 3, value: 50, error: 8 },
            { series: 4, value: 70, error: 2 },
            { series: 5, value: 20, error: 3 },
          ]}
          x="series"
          y="value"
          errorY={(d) => [d.error, d.error + 2]}
        />
      </VictoryChart>
      <VictoryChart horizontal>
        <VictoryErrorBar
          {...props}
          data={[
            { series: 1, value: 9, error: 3 },
            { series: 2, value: 80, error: 4 },
            { series: 3, value: 50, error: 8 },
            { series: 4, value: 70, error: 2 },
            { series: 5, value: 20, error: 3 },
          ]}
          x="series"
          y="value"
          errorY={(d) => [d.error, d.error + 2]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          data={[
            { x: 1, y: 9, error: 3 },
            { x: 2, y: 80, error: 4 },
            { x: 3, y: 50, error: 8 },
            { x: 4, y: 70, error: 2 },
            { x: 5, y: 20, error: 3 },
          ]}
          errorY={(d) => [d.error, d.error + 2]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
