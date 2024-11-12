import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryCandlestick, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getCandlestickData } from "../../utils/data";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

export const Style: Story = {
  args: {
    data: getCandlestickData(7),
  },
  render: (props) => (
    <>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
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
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          style={{
            data: {
              stroke: ({ datum }) =>
                datum.open > datum.close ? "red" : "black",
            },
          }}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
