/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryCandlestick } from "../src/index";
import { VictoryTooltip, VictoryTheme } from "victory-core";
import { range, random } from "lodash";
import seedrandom from "seedrandom";
import { getChartDecorator, getAnimatingComponent, ignoredDecorator } from "./decorators";

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
      x: new Date((current / (num)) * (v + 1)), high, low, open, close
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

const getTransitionData = () => {
  const samples = random(6, 10);
  return range(samples).map((v) => {
    return {
      x: v + 1,
      open: random(150, 450),
      close: random(150, 450),
      high: random(450, 600),
      low: random(0, 150)
    };
  });
};

storiesOf("VictoryCandlestick/static/default", module)
  .add("VictoryCandlestick", () => <VictoryCandlestick/>);

storiesOf("VictoryCandlestick/static/theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryCandlestick data={getData(8)}/>);
storiesOf("VictoryCandlestick/static/theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryCandlestick data={getData(8)}/>);

storiesOf("VictoryCandlestick/static/candleColors", module)
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

storiesOf("VictoryCandlestick/static/wickStrokeWidth", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("wickStrokeWidth", () => <VictoryCandlestick data={getData(7)} wickStrokeWidth={5}/>)
  .add("wickStrokeWidth with styles", () => (
    <VictoryCandlestick
      data={getData(7)}
      style={{
        data: { stroke: "tomato", strokeWidth: 5 }
      }}
      wickStrokeWidth={2}
    />
  ));

storiesOf("VictoryCandlestick/static/data", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with data accessors", () => {
    return (
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
    );
  });

storiesOf("VictoryCandlestick/static/labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryCandlestick data={getData(7)} labels={(d) => `x: ${d.x}`}/>
  ))
  .add("array labels", () => (
    <VictoryCandlestick data={getData(7)} labels={["", "", "three", "four", 5, "six"]}/>
  ))
  .add("data labels", () => (
    <VictoryCandlestick
      data={[
        { x: 1, open: 9, close: 30, high: 56, low: 7, label: "first" },
        { x: 2, open: 80, close: 40, high: 120, low: 10 },
        { x: 3, open: 50, close: 80, high: 90, low: 20, label: "third" },
        { x: 4, open: 70, close: 22, high: 70, low: 5 },
        { x: 5, open: 20, close: 35, high: 50, low: 10, label: ["last", "label"] }
      ]}
    />
  ));

storiesOf("VictoryCandlestick/static/tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("tooltips", () => (
    <VictoryCandlestick
      data={getData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("tooltips with long and short strings", () => (
    <VictoryCandlestick
      data={getData(5)}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active/>}
    />
  ));

storiesOf("VictoryCandlestick/static/style", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with styles", () => (
    <VictoryCandlestick
      data={getData(7)}
      labels={(d) => d.x}
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
          fill: (d) => d.x === 3 ? "red" : "black"
        },
        data: {
          stroke: (d) => d.open > d.close ? "red" : "black"
        }
      }}
      labels={(d) => d.x}
      data={getData(7)}
    />
  ))
  .add("with styles on data", () => (
    <VictoryCandlestick
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { stroke: "tomato", strokeWidth: 2 }
      }}
      labels={(d) => d.x}
      data={[
        { x: 1, open: 9, close: 30, high: 56, low: 7 },
        { x: 2, open: 80, close: 40, high: 120, low: 10, stroke: "teal", fill: "teal" },
        { x: 3, open: 50, close: 80, high: 90, low: 20 },
        { x: 4, open: 70, close: 22, high: 70, low: 5 },
        { x: 5, open: 20, close: 35, high: 50, low: 10 }
      ]}
    />
  ));

storiesOf("VictoryCandlestick/static/scale", module)
  .addDecorator(getChartDecorator({ scale: { x: "time" }, domainPadding: 25 }))
  .add("time scale", () => (
    <VictoryCandlestick data={getTimeData(5)}/>
  ))
  .add("time scale with labels", () => (
    <VictoryCandlestick data={getTimeData(5)} labels={(d) => d.x.getFullYear()}/>
  ));

storiesOf("VictoryCandlestick/animating", module)
  .add("animation transitions", () => {
    const updateState = () => ({ data: getTransitionData() });
    const childComponent = (
      <VictoryCandlestick animate={{ duration: 1000 }}/>
    );
    return getAnimatingComponent(childComponent, updateState);
  });

storiesOf("VictoryCandlestick/issues", module)
  .addDecorator(ignoredDecorator)
  .add("placeholder", () => <VictoryCandlestick/>);
storiesOf("VictoryCandlestick/fixed", module)
  .add("placeholder", () => <VictoryCandlestick/>);


