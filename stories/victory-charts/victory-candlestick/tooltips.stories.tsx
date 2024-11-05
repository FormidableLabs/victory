import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";
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

export const Tooltips: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={getCandlestickData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme[props.themeKey]}
        horizontal
      >
        <VictoryCandlestick
          {...props}
          data={getCandlestickData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme[props.themeKey]}
        horizontal
      >
        <VictoryCandlestick
          {...props}
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          openLabelComponent={<VictoryTooltip active />}
          closeLabelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme[props.themeKey]}
        horizontal
      >
        <VictoryCandlestick
          {...props}
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          openLabelComponent={<VictoryTooltip active />}
          closeLabelComponent={<VictoryTooltip active />}
          labelOrientation={{ open: "top", close: "bottom" }}
        />
      </VictoryChart>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
          highLabelComponent={<VictoryTooltip active />}
          lowLabelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
          highLabelComponent={<VictoryTooltip active />}
          lowLabelComponent={<VictoryTooltip active />}
          labelOrientation={{ low: "left", high: "right" }}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
