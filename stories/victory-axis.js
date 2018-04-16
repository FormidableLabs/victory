/*eslint-disable no-magic-numbers*/
import React from "react";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { storiesOf } from "@storybook/react";
import { VictoryAxis, VictoryChart } from "../src/index";
import { VictoryTheme } from "victory-core";
import { ignoredDecorator } from "./decorators";

const getTimeValues = (num) => {
  const current = 1523389495000;
  return range(num).map((v) => {
    return new Date((current / (num)) * (v + 1));
  });
};

const getValues = (num, min, step) => {
  min = min || 0;
  step = step || 1;
  return range(num).map((v) => v * step + min);
};

const getRandomValues = (num, seed) => {
  seed = seed || "random";
  const baseSeed = seedrandom(seed);
  const rand = () => Math.round(baseSeed.quick() * 100);
  const result = range(num).map(() => rand());
  return result.sort((a, b) => a - b);
};

storiesOf("VictoryAxis/default", module)
  .add("VictoryAxis", () => <VictoryAxis/>);

storiesOf("VictoryAxis/theme", module)
  .add("material theme", () => <VictoryAxis theme={VictoryTheme.material}/>)
  .add("chart axes material theme", () => <VictoryChart theme={VictoryTheme.material}/>)
  .add("four quadrant chart axes material theme", () => (
    <VictoryChart theme={VictoryTheme.material} domain={[-1, 1]}/>
  ))
  .add("grayscale (default) theme", () => <VictoryAxis theme={VictoryTheme.grayscale}/>)
  .add("chart axes grayscale theme", () => <VictoryChart theme={VictoryTheme.grayscale}/>)
  .add("four quadrant chart axes grayscale theme", () => (
    <VictoryChart theme={VictoryTheme.grayscale} domain={[-1, 1]}/>
  ));

storiesOf("VictoryAxis/tickValues", module)
  .add("numeric tickValues", () => <VictoryAxis tickValues={getValues(5)}/>)
  .add("random numeric tickValues", () => <VictoryAxis tickValues={getRandomValues(5)}/>)
  .add("string tickValues", () => <VictoryAxis tickValues={["one", "two", "three", "four"]}/>)
  .add("numeric tickValues (dependentAxis)", () => (
    <VictoryAxis dependentAxis tickValues={getValues(5)}/>
  ))
  .add("random numeric tickValues (dependentAxis)", () => (
    <VictoryAxis dependentAxis tickValues={getRandomValues(5)}/>
  ))
  .add("string tickValues (dependentAxis)", () => (
    <VictoryAxis dependentAxis tickValues={["one", "two", "three", "four"]}/>
  ));

storiesOf("VictoryAxis/tickFormat", module)
  .add("as an array of strings", () => (
    <VictoryAxis tickValues={getValues(5)} tickFormat={["one", "two", "three", "four", "five"]}/>
  ))
  .add("as a function", () => (
    <VictoryAxis tickValues={getValues(5)} tickFormat={(t) => `#${t}`}/>
  ));

storiesOf("VictoryAxis/domain", module)
  .add("without tickValues", () => <VictoryAxis domain={[-10, 10]}/>)
  .add("with tickValues", () => <VictoryAxis domain={[-10, 10]} tickValues={getValues(5)}/>)
  .add("with overflowing tickValues", () => (
    <VictoryAxis domain={[-10, 10]} tickValues={[8, 9, 10, 11, 12, 13]}/>
  ))
  .add("with overflowing string tickValues", () => (
    <VictoryAxis domain={[-2, 2]} tickValues={["cat", "dog", "bird"]}/>
  ));

storiesOf("VictoryAxis/fixLabelOverlap", module)
  .add("evenly spaced ticks", () => <VictoryAxis fixLabelOverlap tickValues={getValues(30)}/>)
  .add("randomly spaced ticks", () => (
    <VictoryAxis fixLabelOverlap tickValues={getRandomValues(30)}/>
  ))
  .add("time scale ticks", () => (
    <VictoryAxis fixLabelOverlap scale="time" tickValues={getTimeValues(30)}/>
  ))
  .add("evenly spaced ticks (dependentAxis)", () => (
    <VictoryAxis dependentAxis fixLabelOverlap tickValues={getValues(30)}/>
  ))
  .add("randomly spaced ticks (dependentAxis)", () => (
    <VictoryAxis dependentAxis fixLabelOverlap tickValues={getRandomValues(30)}/>
  ))
  .add("time scale ticks (dependentAxis)", () => (
    <VictoryAxis dependentAxis fixLabelOverlap scale="time" tickValues={getTimeValues(30)}/>
  ));

storiesOf("VictoryAxis/offsetX", module)
  .add("independent axis", () => <VictoryAxis offsetX={250}/>)
  .add("dependent axis", () => <VictoryAxis dependentAxis offsetX={250}/>);

storiesOf("VictoryAxis/offsetY", module)
  .add("independent axis", () => <VictoryAxis offsetY={250}/>)
  .add("dependent axis", () => <VictoryAxis dependentAxis offsetY={250}/>);

storiesOf("VictoryAxis/orientation", module)
  .add("top", () => <VictoryAxis tickValues={getValues(5)} orientation="top"/>)
  .add("bottom", () => <VictoryAxis tickValues={getValues(5)} orientation="bottom"/>)
  .add("left", () => <VictoryAxis tickValues={getValues(5)} orientation="left"/>)
  .add("right", () => <VictoryAxis tickValues={getValues(5)} orientation="right"/>);

storiesOf("VictoryAxis/style", module)
  .add("functional styles", () => (
    <VictoryAxis
      label="Label"
      style={{
        axis: { stroke: "#756f6a" },
        axisLabel: { fontSize: 20, padding: 30 },
        grid: { stroke: (t) => t > 0.5 ? "red" : "grey" },
        ticks: { stroke: "grey", size: 5 },
        tickLabels: { fontSize: 15, padding: 5 }
      }}
    />
  ));

storiesOf("VictoryAxis/scale", module)
  .add("time", () => <VictoryAxis tickValues={getTimeValues(5)} scale="time"/>)
  .add("log", () => <VictoryAxis scale="log" tickValues={[1, 3, 5, 7, 10, 50, 100, 500, 1000]}/>);

storiesOf("VictoryAxis/issues", module)
  .addDecorator(ignoredDecorator)
  .add("placeholder", () => <VictoryAxis/>);
storiesOf("VictoryAxis/fixed", module)
  .add("placeholder", () => <VictoryAxis/>);


