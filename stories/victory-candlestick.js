/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryCandlestick } from "../packages/victory-candlestick/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { getChartDecorator } from "./decorators";
import { fromJS } from "immutable";

const sampleData = [
  { x: 1, open: 9, close: 30, high: 56, low: 7 },
  { x: 2, open: 80, close: 40, high: 120, low: 10 },
  { x: 3, open: 50, close: 80, high: 90, low: 20 },
  { x: 4, open: 70, close: 22, high: 70, low: 5 },
  { x: 5, open: 20, close: 35, high: 50, low: 10 }
];
const getTimeData = (num, seed) => {
  seed = seed || "getTimeData";
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
      close
    };
  });
};

const getData = (num, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  return range(num).map((v) => {
    const low = 2 + baseSeed.quick() * 5;
    const open = low + baseSeed.quick() * 5;
    const close = low + baseSeed.quick() * 5;
    const high = Math.max(open, close) + baseSeed.quick() * 5;
    return { x: v + 1, high, low, open, close };
  });
};

storiesOf("VictoryCandlestick", module).add("default rendering", () => <VictoryCandlestick />);

storiesOf("VictoryCandlestick.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryCandlestick data={getData(8)} />);
storiesOf("VictoryCandlestick.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryCandlestick data={getData(8)} />);

storiesOf("VictoryCandlestick.candleColors", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("candleColors", () => (
    <VictoryCandlestick
      data={getData(7)}
      candleColors={{ positive: "#8BC34A", negative: "#C62828" }}
    />
  ))
  .add("candleColors with styles", () => (
    <VictoryCandlestick
      data={getData(7)}
      style={{
        data: { fill: "tomato" }
      }}
      candleColors={{ positive: "#8BC34A", negative: "#C62828" }}
    />
  ));

storiesOf("VictoryCandlestick.wickStrokeWidth", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("wickStrokeWidth", () => <VictoryCandlestick data={getData(7)} wickStrokeWidth={5} />)
  .add("wickStrokeWidth with styles", () => (
    <VictoryCandlestick
      data={getData(7)}
      style={{
        data: { stroke: "tomato", strokeWidth: 5 }
      }}
      wickStrokeWidth={2}
    />
  ));

storiesOf("VictoryCandlestick.data", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with data accessors", () => (
    <VictoryCandlestick
      data={[
        { series: 1, open: 9, close: 30, big: 560, low: 7 },
        { series: 2, open: 80, close: 40, big: 1200, low: 10 },
        { series: 3, open: 50, close: 80, big: 900, low: 20 },
        { series: 4, open: 70, close: 22, big: 700, low: 5 },
        { series: 5, open: 20, close: 35, big: 500, low: 10 }
      ]}
      x={"series"}
      high={(data) => data.big / 10}
    />
  ))
  .add("with data accessors (horizontal)", () => (
    <VictoryCandlestick
      horizontal
      data={[
        { series: 1, open: 9, close: 30, big: 560, low: 7 },
        { series: 2, open: 80, close: 40, big: 1200, low: 10 },
        { series: 3, open: 50, close: 80, big: 900, low: 20 },
        { series: 4, open: 70, close: 22, big: 700, low: 5 },
        { series: 5, open: 20, close: 35, big: 500, low: 10 }
      ]}
      x={"series"}
      high={(data) => data.big / 10}
    />
  ))
  .add("with immutable data", () => {
    return (
      <VictoryCandlestick
        data={fromJS([
          { x: 1, open: 9, close: 30, high: 56, low: 7 },
          { x: 2, open: 80, close: 40, high: 120, low: 10 },
          { x: 3, open: 50, close: 80, high: 90, low: 20 },
          { x: 4, open: 70, close: 22, high: 70, low: 5 },
          { x: 5, open: 20, close: 35, high: 50, low: 10 }
        ])}
      />
    );
  });

storiesOf("VictoryCandlestick.labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryCandlestick data={getData(7)} labels={(d) => `x: ${d.x}`} />
  ))
  .add("openLabels and closeLabels", () => (
    <VictoryCandlestick
      data={sampleData}
      openLabels={({ datum }) => datum.open}
      closeLabels={({ datum }) => datum.close}
    />
  ))
  .add("highLabels and lowLabels", () => (
    <VictoryCandlestick
      data={sampleData}
      highLabels={({ datum }) => datum.high}
      lowLabels={({ datum }) => datum.low}
    />
  ))
  .add("array labels", () => (
    <VictoryCandlestick data={getData(7)} labels={["", "", "three", "four", 5, "six"]} />
  ))
  .add("labels with orientation", () => (
    <VictoryCandlestick
      data={sampleData}
      openLabels={({ datum }) => datum.open}
      labelOrientation={{ open: "top" }}
    />
  ))
  .add("data labels (horizontal)", () => (
    <VictoryCandlestick
      horizontal
      data={[
        { x: 1, open: 9, close: 30, high: 56, low: 7, label: "first" },
        { x: 2, open: 80, close: 40, high: 120, low: 10 },
        { x: 3, open: 50, close: 80, high: 90, low: 20, label: "third" },
        { x: 4, open: 70, close: 22, high: 70, low: 5 },
        { x: 5, open: 20, close: 35, high: 50, low: 10, label: ["last", "label"] }
      ]}
      labels={({ datum }) => datum.label}
    />
  ));

storiesOf("VictoryCandlestick.tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("tooltips", () => (
    <VictoryCandlestick
      data={getData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips (horizontal)", () => (
    <VictoryCandlestick
      horizontal
      data={getData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("openLabels tooltips", () => (
    <VictoryCandlestick
      data={sampleData}
      openLabels={({ datum }) => datum.open}
      openLabelComponent={<VictoryTooltip active />}
      labelOrientation="top"
    />
  ))
  .add("closeLabels tooltips", () => (
    <VictoryCandlestick
      data={sampleData}
      closeLabels={({ datum }) => datum.close}
      closeLabelComponent={<VictoryTooltip active />}
      labelOrientation={{ close: "left" }}
    />
  ))
  .add("lowLabels tooltips", () => (
    <VictoryCandlestick
      data={sampleData}
      lowLabels={({ datum }) => datum.low}
      lowLabelComponent={<VictoryTooltip active />}
    />
  ))
  .add("highLabels tooltips", () => (
    <VictoryCandlestick
      data={sampleData}
      highLabels={({ datum }) => datum.high}
      highLabelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips with long and short strings", () => (
    <VictoryCandlestick
      data={getData(5)}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active />}
    />
  ));

storiesOf("VictoryCandlestick.style", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with styles", () => (
    <VictoryCandlestick
      data={getData(7)}
      labels={({ datum }) => datum.x}
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryCandlestick
      style={{
        labels: {
          fill: ({ datum }) => (datum.x === 3 ? "red" : "black")
        },
        data: {
          stroke: ({ datum }) => (datum.open > datum.close ? "red" : "black")
        }
      }}
      labels={({ datum }) => datum.x}
      data={getData(7)}
    />
  ));

storiesOf("VictoryCandlestick.scale", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("time scale", () => <VictoryCandlestick data={getTimeData(5)} />)
  .add("time scale with labels", () => (
    <VictoryCandlestick data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
  ))
  .add("time scale with labels (horizontal)", () => (
    <VictoryCandlestick
      horizontal
      data={getTimeData(5)}
      labels={({ datum }) => datum.x.getFullYear()}
    />
  ));
