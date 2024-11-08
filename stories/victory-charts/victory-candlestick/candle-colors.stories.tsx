import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryCandlestick, VictoryChart, VictoryTheme } from "@/victory";

import { getCandlestickData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

export const CandleColors: Story = {
  args: {
    candleColors: { positive: "#8BC34A", negative: "#C62828" },
    data: getCandlestickData(7),
    domainPadding: 20,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          style={{
            data: { fill: "tomato" },
          }}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
