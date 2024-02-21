import { Meta } from "@storybook/react";
import React from "react";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { fromJS } from "immutable";
import styled from "styled-components";

import { VictoryCandlestick, Candle } from "../packages/victory-candlestick";
import { VictoryChart } from "../packages/victory-chart";
import { VictoryTooltip } from "../packages/victory-tooltip";
import {
  VictoryLabelStyleObject,
  VictoryTheme,
} from "../packages/victory-core";
import { storyContainer } from "./decorators";

const meta: Meta<typeof VictoryCandlestick> = {
  title: "Victory Charts/SVG Container/VictoryCandlestick",
  component: VictoryCandlestick,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const sampleData = [
  { x: 1, open: 9, close: 30, high: 56, low: 7 },
  { x: 2, open: 80, close: 40, high: 120, low: 10 },
  { x: 3, open: 50, close: 80, high: 90, low: 20 },
  { x: 4, open: 70, close: 22, high: 70, low: 5 },
];
const getTimeData = (num, seed = "getTimeData") => {
  const baseSeed = seedrandom(seed);
  const current = 1523389495000;
  return range(num).map((v) => {
    const low = 2 + baseSeed.quick() * 5;
    const open = low + baseSeed.quick() * 5;
    const close = low + baseSeed.quick() * 5;
    const high = Math.max(open, close) + baseSeed.quick() * 5;
    return {
      x: new Date((current / num) * (v + 1)),
      high,
      low,
      open,
      close,
    };
  });
};

const getData = (num, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  return range(num).map((v) => {
    const low = 2 + baseSeed.quick() * 5;
    const open = low + baseSeed.quick() * 5;
    const close = low + baseSeed.quick() * 5;
    const high = Math.max(open, close) + baseSeed.quick() * 5;
    return { x: v + 1, high, low, open, close };
  });
};

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

const defaultChartProps = {
  style: parentStyle,
  domainPadding: 25,
};

export const DefaultRendering = () => {
  return (
    <>
      <VictoryCandlestick style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryCandlestick data={getData(8)} />
      </VictoryChart>
      <VictoryCandlestick style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryCandlestick data={getData(8)} />
      </VictoryChart>
    </>
  );
};

export const CandleColors = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={getData(7)}
          candleColors={{ positive: "#8BC34A", negative: "#C62828" }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={getData(7)}
          style={{
            data: { fill: "tomato" },
          }}
          candleColors={{ positive: "#8BC34A", negative: "#C62828" }}
        />
      </VictoryChart>
    </>
  );
};

export const WickStrokeWidth = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick data={getData(7)} wickStrokeWidth={5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={getData(7)}
          style={{
            data: { stroke: "tomato", strokeWidth: 5 },
          }}
          wickStrokeWidth={2}
        />
      </VictoryChart>
    </>
  );
};

export const Data = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={[
            { series: 1, start: 9, close: 30, big: 560, low: 7 },
            { series: 2, start: 80, close: 40, big: 1200, low: 10 },
            { series: 3, start: 50, close: 80, big: 900, low: 20 },
            { series: 4, start: 70, close: 22, big: 700, low: 5 },
            { series: 5, start: 20, close: 35, big: 500, low: 10 },
          ]}
          x="series"
          open="start"
          high={(data) => data.big / 10}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryCandlestick
          data={[
            { series: 1, start: 9, close: 30, big: 560, low: 7 },
            { series: 2, start: 80, close: 40, big: 1200, low: 10 },
            { series: 3, start: 50, close: 80, big: 900, low: 20 },
            { series: 4, start: 70, close: 22, big: 700, low: 5 },
            { series: 5, start: 20, close: 35, big: 500, low: 10 },
          ]}
          x="series"
          open="start"
          high={(data) => data.big / 10}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={fromJS([
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ])}
        />
      </VictoryChart>
    </>
  );
};

export const Labels = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryCandlestick
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryCandlestick
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryCandlestick
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          labelOrientation={{ open: "top", close: "bottom" }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
          labelOrientation={{ low: "left", high: "right" }}
        />
      </VictoryChart>
    </>
  );
};

export const Tooltips = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryCandlestick
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryCandlestick
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          openLabelComponent={<VictoryTooltip active />}
          closeLabelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryCandlestick
          data={sampleData}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          openLabelComponent={<VictoryTooltip active />}
          closeLabelComponent={<VictoryTooltip active />}
          labelOrientation={{ open: "top", close: "bottom" }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
          highLabelComponent={<VictoryTooltip active />}
          lowLabelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={sampleData}
          highLabels={({ datum }) => datum.high}
          lowLabels={({ datum }) => datum.low}
          highLabelComponent={<VictoryTooltip active />}
          lowLabelComponent={<VictoryTooltip active />}
          labelOrientation={{ low: "left", high: "right" }}
        />
      </VictoryChart>
    </>
  );
};

const labelStyle: VictoryLabelStyleObject = {
  fill: ({ datum }) => (datum.x === 3 ? "red" : "black"),
};

export const Style = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={getData(7)}
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
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          style={{
            labels: labelStyle,
            data: {
              stroke: ({ datum }) =>
                datum.open > datum.close ? "red" : "black",
            },
          }}
          labels={({ datum }) => datum.x}
          data={getData(7)}
        />
      </VictoryChart>
    </>
  );
};

export const Scale = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryCandlestick
          horizontal
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
    </>
  );
};

export const Domain = () => {
  return (
    <>
      <VictoryCandlestick
        {...defaultChartProps}
        domain={{ x: [2, 5], y: [50, 150] }}
        data={fromJS([
          { x: 1, open: 9, close: 30, high: 56, low: 7 },
          { x: 2, open: 80, close: 40, high: 120, low: 10 },
          { x: 3, open: 50, close: 80, high: 90, low: 20 },
          { x: 4, open: 70, close: 22, high: 70, low: 5 },
          { x: 5, open: 20, close: 35, high: 50, low: 10 },
        ])}
      />
      <VictoryChart domain={{ x: [2, 5], y: [50, 150] }} {...defaultChartProps}>
        <VictoryCandlestick
          data={fromJS([
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ])}
        />
      </VictoryChart>
      <VictoryChart minDomain={{ y: 70 }} {...defaultChartProps}>
        <VictoryCandlestick
          data={fromJS([
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ])}
        />
      </VictoryChart>
      <VictoryChart maxDomain={{ x: 4 }} {...defaultChartProps}>
        <VictoryCandlestick
          data={fromJS([
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ])}
        />
      </VictoryChart>
    </>
  );
};

const StyledCandle = styled(Candle)`
  fill: lightblue;
  stroke: magenta;
`;

export const DisableInlineStyles = () => {
  return (
    <>
      <VictoryChart style={parentStyle}>
        <VictoryCandlestick disableInlineStyles data={getData(8)} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryCandlestick
          data={getData(8)}
          dataComponent={<StyledCandle disableInlineStyles />}
        />
      </VictoryChart>
    </>
  );
};
