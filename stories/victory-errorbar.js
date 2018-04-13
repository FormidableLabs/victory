/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryErrorBar } from "../src/index";
import { VictoryTooltip, VictoryTheme } from "victory-core";
import { range, random } from "lodash";
import seedrandom from "seedrandom";
import { getChartDecorator, getAnimatingComponent, ignoredDecorator } from "./decorators";

const getData = (num, symmetric, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 3;
  return range(num).map((v) => {
    return {
      x: v + 3,
      y: baseSeed.quick() * 20 + 5,
      errorX: symmetric ? rand() : [rand(), rand()],
      errorY: symmetric ? rand() : [rand(), rand()]
    };
  });
};

const getTransitionData = () => {
  const samples = random(4, 7);
  return range(samples).map((v) => {
    return {
      x: v + 1,
      y: random(100, 600),
      errorY: [random(50), random(50)]
    };
  });
};

storiesOf("VictoryErrorBar/static/default", module)
  .add("VictoryErrorBar", () => <VictoryErrorBar/>);

storiesOf("VictoryErrorBar/static/theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryErrorBar data={getData(5)}/>);
storiesOf("VictoryErrorBar/static/theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryErrorBar data={getData(5)}/>);

storiesOf("VictoryErrorBar/static/borderWidth", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("borderWidth = 0", () => <VictoryErrorBar data={getData(5)} borderWidth={0}/>)
  .add("borderWidth = 10", () => <VictoryErrorBar data={getData(5)} borderWidth={10}/>);


storiesOf("VictoryErrorBar/static/data", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with data accessors", () => {
    return (
      <VictoryErrorBar
        data={[
          { series: 1, value: 9, error: 3 },
          { series: 2, value: 80, error: 4 },
          { series: 3, value: 50, error: 8 },
          { series: 4, value: 70, error: 2 },
          { series: 5, value: 20, error: 3 }
        ]}
        x="series"
        y="value"
        errorY={(d) => ([d.error, d.error + 2])}
      />
    );
  });

storiesOf("VictoryErrorBar/static/labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryErrorBar data={getData(5)} labels={(d) => `x: ${d.x}`}/>
  ))
  .add("array labels", () => (
    <VictoryErrorBar data={getData(5)} labels={["", "", "three", "4"]}/>
  ))
  .add("data labels", () => (
    <VictoryErrorBar
      data={[
        { x: 1, y: 9, errorX: 0.3, errorY: 3, label: "first" },
        { x: 2, y: 80, errorX: 0.5, errorY: 2 },
        { x: 3, y: 50, errorX: 1.1, errorY: 2, label: "third" },
        { x: 4, y: 70, errorX: 0.2, errorY: 3 },
        { x: 5, y: 20, errorX: 0.3, errorY: 2, label: ["last", "label"] }
      ]}
    />
  ));

storiesOf("VictoryErrorBar/static/tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("tooltips", () => (
    <VictoryErrorBar
      data={getData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("tooltips with long and short strings", () => (
    <VictoryErrorBar
      data={getData(5)}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active/>}
    />
  ));

storiesOf("VictoryErrorBar/static/style", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with styles", () => (
    <VictoryErrorBar
      data={getData(4)}
      labels={(d) => d.x}
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryErrorBar
      style={{
        labels: {
          fill: (d) => d.errorX > d.errorY ? "red" : "black"
        },
        data: {
          stroke: (d) => d.errorX > d.errorY ? "red" : "black"
        }
      }}
      labels={(d) => d.x}
      data={getData(4, "symmetric")}
    />
  ))
  .add("with styles on data", () => (
    <VictoryErrorBar
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { stroke: "tomato", strokeWidth: 2 }
      }}
      labels={(d) => d.x}
      data={[
        { x: 1, y: 9, errorX: 0.5, errorY: 2 },
        { x: 2, y: 80, errorX: 1, errorY: 3, stroke: "teal", fill: "teal" },
        { x: 3, y: 50, errorX: 1.5, errorY: 4 },
        { x: 4, y: 70, errorX: 1, errorY: 3 },
        { x: 5, y: 20, errorX: 0.5, errorY: 1 }
      ]}
    />
  ));

storiesOf("VictoryErrorBar/animating", module)
  .add("animation transitions", () => {
    const updateState = () => ({ data: getTransitionData() });
    const childComponent = (
      <VictoryErrorBar animate={{ duration: 1000 }}/>
    );
    return getAnimatingComponent(childComponent, updateState);
  });

storiesOf("VictoryErrorBar/issues", module)
  .addDecorator(ignoredDecorator)
  .add("placeholder", () => <VictoryErrorBar/>);
storiesOf("VictoryErrorBar/fixed", module)
  .add("placeholder", () => <VictoryErrorBar/>);


