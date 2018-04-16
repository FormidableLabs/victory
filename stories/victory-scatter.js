/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryScatter, VictoryStack } from "../src/index";
import { VictoryTooltip, VictoryTheme } from "victory-core";
import { getData, getMixedData, getTimeData, getLogData } from "./data";
import { getChartDecorator, getPolarChartDecorator, ignoredDecorator } from "./decorators";

const SYMBOLS = [
  "circle", "diamond", "plus", "minus", "square", "star", "triangleDown", "triangleUp"
];

storiesOf("VictoryScatter/default", module)
  .add("VictoryScatter", () => <VictoryScatter/>);

storiesOf("VictoryScatter/theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.material }))
  .add("material theme", () => <VictoryScatter data={getData(8)}/>)
  .add("material theme stacked", () => (
    <VictoryStack labels={(d) => d.x}>
      <VictoryScatter data={getData(8)}/>
      <VictoryScatter data={getData(8, "seed-1")}/>
      <VictoryScatter data={getData(8, "seed-2")}/>
      <VictoryScatter data={getData(8, "seed-3")}/>
      <VictoryScatter data={getData(8, "seed-4")}/>
    </VictoryStack>
));
storiesOf("VictoryScatter/theme", module)
  .addDecorator(getChartDecorator({ theme: VictoryTheme.grayscale }))
  .add("grayscale (default) theme", () => <VictoryScatter data={getData(8)}/>)
  .add("grayscale (default) stacked", () => (
    <VictoryStack labels={(d) => d.x}>
      <VictoryScatter data={getData(8)}/>
      <VictoryScatter data={getData(8, "seed-1")}/>
      <VictoryScatter data={getData(8, "seed-2")}/>
      <VictoryScatter data={getData(8, "seed-3")}/>
      <VictoryScatter data={getData(8, "seed-4")}/>
    </VictoryStack>
));

storiesOf("VictoryScatter/symbol", module)
  .addDecorator(getChartDecorator({ domainPadding: 20 }))
  .add("circle", () => <VictoryScatter data={getData(8)} symbol="circle" size={(d) => d.x + 1}/>)
  .add("diamond", () => <VictoryScatter data={getData(8)} symbol="diamond" size={(d) => d.x + 1}/>)
  .add("plus", () => <VictoryScatter data={getData(8)} symbol="plus" size={(d) => d.x + 1}/>)
  .add("minus", () => <VictoryScatter data={getData(8)} symbol="minus" size={(d) => d.x + 1}/>)
  .add("square", () => <VictoryScatter data={getData(8)} symbol="square" size={(d) => d.x + 1}/>)
  .add("star", () => <VictoryScatter data={getData(8)} symbol="star" size={(d) => d.x + 1}/>)
  .add("triangleDown", () => (
    <VictoryScatter data={getData(8)} symbol="triangleDown" size={(d) => d.x + 1}/>
  ))
  .add("triangleUp", () => (
    <VictoryScatter data={getData(8)} symbol="triangleUp" size={(d) => d.x + 1}/>
  ))
  .add("as a function", () => (
    <VictoryScatter data={getData(8)} symbol={(d) => SYMBOLS[d.x - 1]} size={5}/>
  ))
  .add("on data", () => (
    <VictoryScatter
      data={[
        { x: 1, y: 45, symbol: "star" },
        { x: 2, y: 85 },
        { x: 3, y: 55, symbol: "square" },
        { x: 4, y: 15 }
      ]}
      symbol="plus"
      size={5}
    />
  ));

storiesOf("VictoryScatter/bubbleProperty", module)
  .addDecorator(getChartDecorator({ domainPadding: 20 }))
  .add("bubbleProperty", () => (
    <VictoryScatter data={getData(10)} bubbleProperty="x"/>
  ))
  .add("with maxBubbleSize", () => (
    <VictoryScatter data={getData(10)} bubbleProperty="x" maxBubbleSize={25}/>
  ))
  .add("with minBubbleSize", () => (
    <VictoryScatter data={getData(10)} bubbleProperty="x" minBubbleSize={10}/>
  ))
  .add("with maxBubbleSize and minBubbleSize", () => (
    <VictoryScatter data={getData(10)} bubbleProperty="x" minBubbleSize={8} maxBubbleSize={20}/>
  ))
  .add("with a size prop set", () => (
    <VictoryScatter data={getData(10)} bubbleProperty="x" size={3}/>
  ))
  .add("with a symbol prop set", () => (
    <VictoryScatter data={getData(10)} bubbleProperty="x" symbol="plus"/>
  ));

storiesOf("VictoryScatter/data", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with data accessors", () => {
    return (
    <VictoryScatter
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
      <VictoryScatter
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
  .add("plotting functions", () => (<VictoryScatter y={(d) => Math.sin(2 * Math.PI * d.x)}/>));

storiesOf("VictoryScatter/labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryScatter data={getData(7)} labels={(d) => `x: ${d.x}`}/>
  ))
  .add("array labels", () => (
    <VictoryScatter data={getData(7)} labels={["", "", "three", "four", 5, "six"]}/>
  ))
  .add("data labels", () => (
    <VictoryScatter
      data={[
        { x: 1, y: 2, label: "cat" },
        { x: 2, y: 5, label: "dog" },
        { x: 3, y: 3, label: "dog" },
        { x: 4, y: -2, label: "bird" },
        { x: 5, y: -5, label: "cat" }
      ]}
    />
  ));

storiesOf("VictoryScatter/tooltips", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("tooltips", () => (
    <VictoryScatter
      data={getData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("tooltips (negative)", () => (
    <VictoryScatter
      data={getMixedData(5)}
      labels={(d) => `x: ${d.x}`}
      labelComponent={<VictoryTooltip active/>}
    />
  ))
  .add("tooltips with long and short strings", () => (
    <VictoryScatter
      data={getData(5)}
      labels={["one", "two", 3, "wow, four tooltips", "five"]}
      labelComponent={<VictoryTooltip active/>}
    />
  ));

storiesOf("VictoryScatter/style", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("with styles", () => (
    <VictoryScatter
      data={getData(7)}
      size={5}
      labels={(d) => d.x}
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryScatter
      size={5}
      style={{
        labels: {
          fill: (d) => d.x === "Dog" ? "red" : "black"
        },
        data: {
          stroke: (d) => d.y > 75 ? "red" : "transparent",
          strokeWidth: 3,
          opacity: (d) => d.y > 75 ? 1 : 0.4
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
  ))
  .add("with styles on data", () => (
    <VictoryScatter
      size={5}
      style={{
        labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
        data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
      }}
      labels={(d) => d.x}
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55, fill: "teal", stroke: "teal", width: 10 },
        { x: "Bird", y: 55 }
      ]}
    />
  ));

storiesOf("VictoryScatter/stacked", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("stacked points", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryScatter data={getData(7)} size={5}/>
      <VictoryScatter data={getData(7, "seed-1")} size={5}/>
      <VictoryScatter data={getData(7, "seed-2")} size={5}/>
    </VictoryStack>
  ))
  .add("stacked points with mixed lengths", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryScatter data={getData(9)} size={5}/>
      <VictoryScatter data={getData(5, "seed-1")} size={5}/>
      <VictoryScatter data={getData(3, "seed-2")} size={5}/>
    </VictoryStack>
  ))
  .add("stacked points with labels", () => (
    <VictoryStack colorScale="qualitative" labels={(d) => d.x}>
      <VictoryScatter data={getData(7)} size={5}/>
      <VictoryScatter data={getData(7, "seed-1")} size={5}/>
      <VictoryScatter data={getData(7, "seed-2")} size={5}/>
    </VictoryStack>
  ))
  .add("stacked negative points", () => (
    <VictoryStack colorScale="qualitative" labels={(d) => d.x}>
      <VictoryScatter data={getMixedData(7)} size={5}/>
      <VictoryScatter data={getMixedData(7, "seed-1")} size={5}/>
      <VictoryScatter data={getMixedData(7, "seed-2")} size={5}/>
    </VictoryStack>
  ));


storiesOf("VictoryScatter/scale", module)
  .addDecorator(getChartDecorator({ scale: { x: "time" }, domainPadding: 25 }))
  .add("time scale", () => (
    <VictoryScatter data={getTimeData(5)}/>
  ))
  .add("time scale with labels", () => (
    <VictoryScatter data={getTimeData(5)} labels={(d) => d.x.getFullYear()}/>
  ))
  .add("stacked time scale with labels", () => (
    <VictoryStack labels={(d) => d.x.getFullYear()}>
      <VictoryScatter data={getTimeData(5)}/>
      <VictoryScatter data={getTimeData(5, "seed-1")}/>
      <VictoryScatter data={getTimeData(5, "seed-2")}/>
    </VictoryStack>
  ));
storiesOf("VictoryScatter/scale", module)
  .addDecorator(getChartDecorator({ scale: { y: "log" }, domainPadding: 25 }))
  .add("log scale", () => <VictoryScatter data={getLogData(7)}/>);

storiesOf("VictoryScatter/polar", module)
  .add("Polar Scatter", () => (
    <VictoryScatter polar theme={VictoryTheme.material} data={getData(7)}/>
  ));
storiesOf("VictoryScatter/polar", module)
  .addDecorator(getPolarChartDecorator())
  .add("Polar Scatter with chart", () => <VictoryScatter data={getData(7)}/>)
  .add("Polar Scatter with categorical data", () => (
    <VictoryScatter
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 },
        { x: "Frog", y: 75 }
      ]}
    />
  ))
  .add("Polar stacked Scatter", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryScatter data={getData(7)}/>
      <VictoryScatter data={getData(7, "seed-1")}/>
      <VictoryScatter data={getData(7, "seed-2")}/>
    </VictoryStack>
  ));
storiesOf("VictoryScatter/polar", module)
  .addDecorator(getPolarChartDecorator({ innerRadius: 50 }))
  .add("Polar Scatter with innerRadius", () => <VictoryScatter data={getData(7)}/>)
  .add("Polar stacked Scatter with innerRadius", () => (
    <VictoryStack colorScale="qualitative">
      <VictoryScatter data={getData(7)}/>
      <VictoryScatter data={getData(7, "seed-1")}/>
      <VictoryScatter data={getData(7, "seed-2")}/>
    </VictoryStack>
  ));

storiesOf("VictoryScatter/issues", module)
  .addDecorator(ignoredDecorator)
  .add("placeholder", () => <VictoryScatter/>);
storiesOf("VictoryScatter/fixed", module)
  .add("placeholder", () => <VictoryScatter/>);


