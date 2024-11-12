import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryCandlestick, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

export const Data: Story = {
  args: {
    domainPadding: 20,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={[
            { series: 1, start: 9, close: 30, big: 560, low: 7 },
            { series: 2, start: 80, close: 40, big: 1200, low: 10 },
            { series: 3, start: 50, close: 80, big: 900, low: 20 },
            { series: 4, start: 70, close: 22, big: 700, low: 5 },
            { series: 5, start: 20, close: 35, big: 500, low: 10 },
          ]}
          x="series"
          open="start"
          high={(data: any) => data.big / 10}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryCandlestick
          {...props}
          data={[
            { series: 1, start: 9, close: 30, big: 560, low: 7 },
            { series: 2, start: 80, close: 40, big: 1200, low: 10 },
            { series: 3, start: 50, close: 80, big: 900, low: 20 },
            { series: 4, start: 70, close: 22, big: 700, low: 5 },
            { series: 5, start: 20, close: 35, big: 500, low: 10 },
          ]}
          x="series"
          open="start"
          high={(data: any) => data.big / 10}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={[
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
