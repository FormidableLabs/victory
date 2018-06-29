/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryArea, VictoryStack } from "../src/index";
import { VictoryTooltip, VictoryTheme } from "victory-core";
import { getData, getMixedData, getTimeData, getLogData } from "./data";
import { getChartDecorator, getPolarChartDecorator } from "./decorators";

storiesOf("VictoryArea", module)
  .add("default rendering", () => <VictoryArea/>);

storiesOf("VictoryArea.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryArea data={getData(8)}/>)
  .add("material theme stacked", () => (
    <VictoryStack labels={(d) => d.x}>
      <VictoryArea data={getData(8)}/>
      <VictoryArea data={getData(8, "seed-1")}/>
      <VictoryArea data={getData(8, "seed-2")}/>
      <VictoryArea data={getData(8, "seed-3")}/>
      <VictoryArea data={getData(8, "seed-4")}/>
    </VictoryStack>
));
storiesOf("VictoryArea.theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryArea data={getData(8)}/>)
  .add("grayscale (default) stacked", () => (
    <VictoryStack labels={(d) => d.x}>
      <VictoryArea data={getData(8)}/>
      <VictoryArea data={getData(8, "seed-1")}/>
      <VictoryArea data={getData(8, "seed-2")}/>
      <VictoryArea data={getData(8, "seed-3")}/>
      <VictoryArea data={getData(8, "seed-4")}/>
    </VictoryStack>
));

storiesOf("VictoryArea.interpolation", module)
  .addDecorator(getChartDecorator())
  .add("basis", () => <VictoryArea data={getData(8)} interpolation="basis"/>)
  .add("cardinal", () => <VictoryArea data={getData(8)} interpolation="cardinal"/>)
  .add("catmullRom", () => <VictoryArea data={getData(8)} interpolation="catmullRom"/>)
  .add("linear", () => <VictoryArea data={getData(8)} interpolation="linear"/>)
  .add("monotoneX", () => <VictoryArea data={getData(8)} interpolation="monotoneX"/>)
  .add("monotoneY", () => <VictoryArea data={getData(8)} interpolation="monotoneY"/>)
  .add("natural", () => <VictoryArea data={getData(8)} interpolation="natural"/>)
  .add("step", () => <VictoryArea data={getData(8)} interpolation="step"/>)
  .add("stepAfter", () => <VictoryArea data={getData(8)} interpolation="stepAfter"/>)
  .add("stepBefore", () => <VictoryArea data={getData(8)} interpolation="stepBefore"/>);

storiesOf("VictoryArea.data", module)
  .addDecorator(getChartDecorator())
  .add("with data accessors", () => {
    return (
    <VictoryArea
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
  .add("with y0", () => <VictoryArea data={getData(8)} y0={(d) => d.y - 1}/>)
  .add("with nested data accessors", () => {
    return (
      <VictoryArea
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
  .add("plotting functions", () => (<VictoryArea y={(d) => Math.sin(2 * Math.PI * d.x)}/>));

storiesOf("VictoryArea.labels", module)
  .addDecorator(getChartDecorator())
  .add("function labels", () => (
    <VictoryArea data={getData(7)} labels={(d) => `x: ${d.x}`}/>
  ))
  .add("array labels", () => (
    <VictoryArea data={getData(7)} labels={["", "", "three", "four", 5, "six"]}/>
  ))
  .add("data labels", () => (
    <VictoryArea
      data={[
        { x: 1, y: 2, label: "cat" },
        { x: 2, y: 5, label: "dog" },
        { x: 3, y: 3, label: "dog" },
        { x: 4, y: -2, label: "bird" },
        { x: 5, y: -5, label: "cat" }
      ]}
    />
  ));

storiesOf("VictoryArea.tooltips", module)
  .addDecorator(getChartDecorator())
  .add("tooltips", () => (
    <VictoryArea
      data={getData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("tooltips (negative)", () => (
    <VictoryArea
      data={getMixedData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("tooltips with long and short strings", () => (
    <VictoryArea
      data={getData(5)}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active/>}
    />
  ));

storiesOf("VictoryArea.style", module)
  .addDecorator(getChartDecorator())
  .add("with styles", () => (
    <VictoryArea
      data={getData(7)}
      labels={(d) => d.x}
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryArea
      style={{
        labels: {
          fill: (d) => d.x === "Dog" ? "red" : "black"
        }
      }}
      labels={(d) => d.x}
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 }
      ]}
    />
  ));

storiesOf("VictoryArea.stacked", module)
  .addDecorator(getChartDecorator())
  .add("stacked area", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryArea data={getData(7)}/>
      <VictoryArea data={getData(7, "seed-1")}/>
      <VictoryArea data={getData(7, "seed-2")}/>
    </VictoryStack>
  ))
  .add("stacked area with mixed lengths", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryArea data={getData(9)}/>
      <VictoryArea data={getData(5, "seed-1")}/>
      <VictoryArea data={getData(3, "seed-2")}/>
    </VictoryStack>
  ))
  .add("stacked area with labels", () => (
    <VictoryStack colorScale="qualitative" labels={(d) => d.x}>
      <VictoryArea data={getData(7)}/>
      <VictoryArea data={getData(7, "seed-1")}/>
      <VictoryArea data={getData(7, "seed-2")}/>
    </VictoryStack>
  ));


storiesOf("VictoryArea.scale", module)
  .addDecorator(getChartDecorator({ scale: { x: "time" } }))
  .add("time scale", () => (
    <VictoryArea data={getTimeData(5)}/>
  ))
  .add("time scale with labels", () => (
    <VictoryArea data={getTimeData(5)} labels={(d) => d.x.getFullYear()}/>
  ))
  .add("stacked time scale with labels", () => (
    <VictoryStack labels={(d) => d.x.getFullYear()}>
      <VictoryArea data={getTimeData(5)}/>
      <VictoryArea data={getTimeData(5, "seed-1")}/>
      <VictoryArea data={getTimeData(5, "seed-2")}/>
    </VictoryStack>
  ));

storiesOf("VictoryArea.scale", module)
  .addDecorator(getChartDecorator({ scale: { y: "log" } }))
  .add("log scale", () => <VictoryArea data={getLogData(7)}/>);

storiesOf("VictoryArea.polar", module)
  .add("Polar Area", () => (
    <VictoryArea polar theme={VictoryTheme.material} data={getData(7)}/>
  ));
storiesOf("VictoryArea.polar", module)
  .addDecorator(getPolarChartDecorator())
  .add("Polar Area with chart", () => <VictoryArea data={getData(7)}/>)
  .add("Polar Area with categorical data", () => (
    <VictoryArea
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 },
        { x: "Frog", y: 75 }
      ]}
    />
  ))
  .add("Polar stacked area", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryArea data={getData(7)}/>
      <VictoryArea data={getData(7, "seed-1")}/>
      <VictoryArea data={getData(7, "seed-2")}/>
    </VictoryStack>
  ));
storiesOf("VictoryArea.polar", module)
  .addDecorator(getPolarChartDecorator({ innerRadius: 50 }))
  .add("Polar Area with innerRadius", () => <VictoryArea data={getData(7)}/>)
  .add("Polar stacked area with innerRadius", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryArea data={getData(7)}/>
      <VictoryArea data={getData(7, "seed-1")}/>
      <VictoryArea data={getData(7, "seed-2")}/>
    </VictoryStack>
  ));
