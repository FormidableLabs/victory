import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryErrorBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";

import { getErrorBarData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorBar",
};

export const Labels: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryErrorBar
          {...props}
          data={getErrorBarData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryErrorBar
          {...props}
          data={getErrorBarData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3, label: "first" },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2, label: "third" },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2, label: ["last", "label"] },
          ]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3, label: "first" },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2, label: "third" },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2, label: ["last", "label"] },
          ]}
          labelComponent={<VictoryTooltip active />}
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
