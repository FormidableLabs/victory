import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryErrorBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getErrorBarData } from "../../utils/data";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorBar",
};

export const Style: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          data={getErrorBarData(4)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: {
              fill: "tomato",
              fillOpacity: 0.7,
              stroke: "tomato",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          style={{
            data: {
              stroke: ({ datum }) =>
                datum.errorX > datum.errorY ? "red" : "black",
            },
          }}
          labels={({ datum }) => datum.x}
          data={getErrorBarData(4, true)}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
