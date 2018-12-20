/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryStack } from "../packages/victory-stack/src/index";
import { VictoryLine } from "../packages/victory-line/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";
import { getData, getMixedData, getTimeData, getLogData } from "./data";
import { getChartDecorator, getPolarChartDecorator } from "./decorators";

storiesOf("VictoryLine", module).add("default rendering", () => <VictoryLine />);

storiesOf("VictoryLine.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryLine data={getData(8)} />)
  .add("material theme stacked", () => (
    <VictoryStack labels={(d) => d.x}>
      <VictoryLine data={getData(8)} />
      <VictoryLine data={getData(8, "seed-1")} />
      <VictoryLine data={getData(8, "seed-2")} />
      <VictoryLine data={getData(8, "seed-3")} />
      <VictoryLine data={getData(8, "seed-4")} />
    </VictoryStack>
  ));
storiesOf("VictoryLine.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryLine data={getData(8)} />)
  .add("grayscale (default) stacked", () => (
    <VictoryStack labels={(d) => d.x}>
      <VictoryLine data={getData(8)} />
      <VictoryLine data={getData(8, "seed-1")} />
      <VictoryLine data={getData(8, "seed-2")} />
      <VictoryLine data={getData(8, "seed-3")} />
      <VictoryLine data={getData(8, "seed-4")} />
    </VictoryStack>
  ));

storiesOf("VictoryLine.interpolation", module)
  .addDecorator(getChartDecorator())
  .add("basis", () => <VictoryLine data={getData(8)} interpolation="basis" />)
  .add("cardinal", () => <VictoryLine data={getData(8)} interpolation="cardinal" />)
  .add("catmullRom", () => <VictoryLine data={getData(8)} interpolation="catmullRom" />)
  .add("linear", () => <VictoryLine data={getData(8)} interpolation="linear" />)
  .add("monotoneX", () => <VictoryLine data={getData(8)} interpolation="monotoneX" />)
  .add("monotoneY", () => <VictoryLine data={getData(8)} interpolation="monotoneY" />)
  .add("natural", () => <VictoryLine data={getData(8)} interpolation="natural" />)
  .add("step", () => <VictoryLine data={getData(8)} interpolation="step" />)
  .add("stepAfter", () => <VictoryLine data={getData(8)} interpolation="stepAfter" />)
  .add("stepBefore", () => <VictoryLine data={getData(8)} interpolation="stepBefore" />);

storiesOf("VictoryLine.data", module)
  .addDecorator(getChartDecorator())
  .add("with data accessors", () => {
    return (
      <VictoryLine
        data={[
          { animal: "Cat", pet: 45, wild: 17 },
          { animal: "Dog", pet: 85, wild: 6 },
          { animal: "Fish", pet: 55, wild: 0 },
          { animal: "Bird", pet: 15, wild: 40 }
        ]}
        x={"animal"}
        y={(data) => data.pet + data.wild}
      />
    );
  })
  .add("with nested data accessors", () => {
    return (
      <VictoryLine
        data={[
          { a: { b: { c: 1, d: 1 } } },
          { a: { b: { c: 2, d: 3 } } },
          { a: { b: { c: 3, d: 2 } } }
        ]}
        x={"a.b.c"}
        y={"a.b.d"}
      />
    );
  })
  .add("plotting functions", () => <VictoryLine y={(d) => Math.sin(2 * Math.PI * d.x)} />);

storiesOf("VictoryLine.labels", module)
  .addDecorator(getChartDecorator())
  .add("function labels", () => <VictoryLine data={getData(7)} labels={(d) => `x: ${d.x}`} />)
  .add("array labels", () => (
    <VictoryLine data={getData(7)} labels={["", "", "three", "four", 5, "six"]} />
  ))
  .add("data labels", () => (
    <VictoryLine
      data={[
        { x: 1, y: 2, label: "cat" },
        { x: 2, y: 5, label: "dog" },
        { x: 3, y: 3, label: "dog" },
        { x: 4, y: -2, label: "bird" },
        { x: 5, y: -5, label: "cat" }
      ]}
    />
  ));

storiesOf("VictoryLine.tooltips", module)
  .addDecorator(getChartDecorator())
  .add("tooltips", () => (
    <VictoryLine
      data={getData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips (negative)", () => (
    <VictoryLine
      data={getMixedData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active />}
    />
  ))
  .add("tooltips with long and short strings", () => (
    <VictoryLine
      data={getData(5)}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active />}
    />
  ));

storiesOf("VictoryLine.style", module)
  .addDecorator(getChartDecorator())
  .add("with styles", () => (
    <VictoryLine
      data={getData(7)}
      labels={(d) => d.x}
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { stroke: "tomato", strokeWidth: 2 }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryLine
      style={{
        labels: {
          fill: (d) => (d.x === "Dog" ? "red" : "black")
        }
      }}
      labels={(d) => d.x}
      data={[{ x: "Cat", y: 62 }, { x: "Dog", y: 91 }, { x: "Fish", y: 55 }, { x: "Bird", y: 55 }]}
    />
  ));

storiesOf("VictoryLine.stacked", module)
  .addDecorator(getChartDecorator())
  .add("stacked lines", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryLine data={getData(7)} />
      <VictoryLine data={getData(7, "seed-1")} />
      <VictoryLine data={getData(7, "seed-2")} />
    </VictoryStack>
  ))
  .add("stacked lines with mixed lengths", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryLine data={getData(9)} />
      <VictoryLine data={getData(5, "seed-1")} />
      <VictoryLine data={getData(3, "seed-2")} />
    </VictoryStack>
  ))
  .add("stacked lines with labels", () => (
    <VictoryStack colorScale="qualitative" labels={(d) => d.x}>
      <VictoryLine data={getData(7)} />
      <VictoryLine data={getData(7, "seed-1")} />
      <VictoryLine data={getData(7, "seed-2")} />
    </VictoryStack>
  ));

storiesOf("VictoryLine.scale", module)
  .addDecorator(getChartDecorator({ scale: { x: "time" } }))
  .add("time scale", () => <VictoryLine data={getTimeData(5)} />)
  .add("time scale with labels", () => (
    <VictoryLine data={getTimeData(5)} labels={(d) => d.x.getFullYear()} />
  ))
  .add("stacked time scale with labels", () => (
    <VictoryStack labels={(d) => d.x.getFullYear()}>
      <VictoryLine data={getTimeData(5)} />
      <VictoryLine data={getTimeData(5, "seed-1")} />
      <VictoryLine data={getTimeData(5, "seed-2")} />
    </VictoryStack>
  ));
storiesOf("VictoryLine.scale", module)
  .addDecorator(getChartDecorator({ scale: { y: "log" } }))
  .add("log scale", () => <VictoryLine data={getLogData(10)} />);

storiesOf("VictoryLine.polar", module).add("Polar Line", () => (
  <VictoryLine polar theme={VictoryTheme.material} data={getData(7)} />
));
storiesOf("VictoryLine.polar", module)
  .addDecorator(getPolarChartDecorator())
  .add("Polar Line with chart", () => <VictoryLine data={getData(7)} />)
  .add("Polar Line with categorical data", () => (
    <VictoryLine
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 },
        { x: "Frog", y: 75 }
      ]}
    />
  ))
  .add("Polar stacked Line", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryLine data={getData(7)} />
      <VictoryLine data={getData(7, "seed-1")} />
      <VictoryLine data={getData(7, "seed-2")} />
    </VictoryStack>
  ));
storiesOf("VictoryLine.polar", module)
  .addDecorator(getPolarChartDecorator({ innerRadius: 50 }))
  .add("Polar Line with innerRadius", () => <VictoryLine data={getData(7)} />)
  .add("Polar stacked Line with innerRadius", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryLine data={getData(7)} />
      <VictoryLine data={getData(7, "seed-1")} />
      <VictoryLine data={getData(7, "seed-2")} />
    </VictoryStack>
  ));
