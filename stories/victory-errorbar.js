/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryErrorBar } from "../packages/victory-errorbar/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { getChartDecorator } from "./decorators";

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

storiesOf("VictoryErrorBar", module)
  .add("default rendering", () => <VictoryErrorBar/>);

storiesOf("VictoryErrorBar.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryErrorBar data={getData(5)}/>);
storiesOf("VictoryErrorBar.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryErrorBar data={getData(5)}/>);

storiesOf("VictoryErrorBar.borderWidth", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("borderWidth = 0", () => <VictoryErrorBar data={getData(5)} borderWidth={0}/>)
  .add("borderWidth = 10", () => <VictoryErrorBar data={getData(5)} borderWidth={10}/>);


storiesOf("VictoryErrorBar.data", module)
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

storiesOf("VictoryErrorBar.labels", module)
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

storiesOf("VictoryErrorBar.tooltips", module)
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

storiesOf("VictoryErrorBar.style", module)
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
  ));
