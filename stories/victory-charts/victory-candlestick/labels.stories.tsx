import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryCandlestick, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getCandlestickData } from "../../utils/data";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

const sampleData = [
  { x: 1, open: 9, close: 30, high: 56, low: 7 },
  { x: 2, open: 80, close: 40, high: 120, low: 10 },
  { x: 3, open: 50, close: 80, high: 90, low: 20 },
  { x: 4, open: 70, close: 22, high: 70, low: 5 },
];

export const Labels: Story = {
  args: {
    domainPadding: 20,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={getCandlestickData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryCandlestick
          {...props}
          data={getCandlestickData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryCandlestick
          {...props}
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryCandlestick
          {...props}
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          labelOrientation={{ open: "top", close: "bottom" }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
          labelOrientation={{ low: "left", high: "right" }}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
