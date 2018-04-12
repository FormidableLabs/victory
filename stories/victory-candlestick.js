/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryCandlestick } from "../src/index";
import { VictoryTooltip } from "victory-core";
import { range, random } from "lodash";
import seedrandom from "seedrandom";
import { getChartDecorator, getAnimatingComponent } from "./decorators";

const getTimeData = (num, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  const current = 1523389495000;
  return range(num).map((v) => {
    return {
      x: new Date((current / (num)) * (v + 1)),
      open: baseSeed.quick() * 10 + 5,
      close: baseSeed.quick() * 10 + 5,
      high: baseSeed.quick() * 15 + 10,
      low: baseSeed.quick() + 5
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
  return range(samples).map((data) => {
    return {
      x: data,
      open: random(4, 10),
      clone: random(4, 10),
      high: random(10, 15),
      low: random(1, 4)
    };
  });
};

storiesOf("VictoryCandlestick/static/default", module)
  .add("VictoryCandlestick", () => <VictoryCandlestick/>);

storiesOf("VictoryCandlestick/static/symbol", module)
  .addDecorator(getChartDecorator({ domainPadding: 20 }))
  .add("circle", () => <VictoryCandlestick data={getData(8)} symbol="circle" size={(d) => d.x + 1}/>)
  .add("diamond", () => <VictoryCandlestick data={getData(8)} symbol="diamond" size={(d) => d.x + 1}/>)
  .add("plus", () => <VictoryCandlestick data={getData(8)} symbol="plus" size={(d) => d.x + 1}/>)
  .add("minus", () => <VictoryCandlestick data={getData(8)} symbol="minus" size={(d) => d.x + 1}/>)
  .add("square", () => <VictoryCandlestick data={getData(8)} symbol="square" size={(d) => d.x + 1}/>)
  .add("star", () => <VictoryCandlestick data={getData(8)} symbol="star" size={(d) => d.x + 1}/>)
  .add("triangleDown", () => (
    <VictoryCandlestick data={getData(8)} symbol="triangleDown" size={(d) => d.x + 1}/>
  ))
  .add("triangleUp", () => (
    <VictoryCandlestick data={getData(8)} symbol="triangleUp" size={(d) => d.x + 1}/>
  ))
  .add("on data", () => (
    <VictoryCandlestick
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

// storiesOf("VictoryCandlestick/static/data", module)
//   .addDecorator(getChartDecorator({ domainPadding: 25 }))
//   .add("with data accessors", () => {
//     return (
//     <VictoryCandlestick
//       data={[
//         { animal: "Cat", pet: 45, wild: 17 },
//         { animal: "Dog", pet: 85, wild: 6 },
//         { animal: "Fish", pet: 55, wild: 0 },
//         { animal: "Bird", pet: 15, wild: 40 }
//       ]}
//       x={"animal"}
//       y={(data) => data.pet + data.wild}
//     />
//     );
//   })
//   .add("with nested data accessors", () => {
//     return (
//       <VictoryCandlestick
//         data={[
//           { a: { b: { c: 1, d: 1 } } },
//           { a: { b: { c: 2, d: 3 } } },
//           { a: { b: { c: 3, d: 2 } } }
//         ]}
//         x={"a.b.c"}
//         y={"a.b.d"}
//       />
//     );
//   })
//   .add("plotting functions", () => (<VictoryCandlestick y={(d) => Math.sin(2 * Math.PI * d.x)}/>));

storiesOf("VictoryCandlestick/static/labels", module)
  .addDecorator(getChartDecorator({ domainPadding: 25 }))
  .add("function labels", () => (
    <VictoryCandlestick data={getData(7)} labels={(d) => `x: ${d.x}`}/>
  ))
  .add("array labels", () => (
    <VictoryCandlestick data={getData(7)} labels={["", "", "three", "four", 5, "six"]}/>
  ))
  // .add("data labels", () => (
  //   <VictoryCandlestick
  //     data={[
  //       { x: 1, y: 2, label: "cat" },
  //       { x: 2, y: 5, label: "dog" },
  //       { x: 3, y: 3, label: "dog" },
  //       { x: 4, y: -2, label: "bird" },
  //       { x: 5, y: -5, label: "cat" }
  //     ]}
  //   />
  // ));

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
      size={5}
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
  // .add("with styles on data", () => (
  //   <VictoryCandlestick
  //     size={5}
  //     style={{
  //       labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
  //       data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
  //     }}
  //     labels={(d) => d.x}
  //     data={[
  //       { x: "Cat", y: 62 },
  //       { x: "Dog", y: 91 },
  //       { x: "Fish", y: 55, fill: "teal", stroke: "teal", width: 10 },
  //       { x: "Bird", y: 55 }
  //     ]}
  //   />
  // ));

storiesOf("VictoryCandlestick/static/time scale", module)
  .addDecorator(getChartDecorator({ scale: { x: "time" }, domainPadding: 25 }))
  .add("time scale", () => (
    <VictoryCandlestick data={getTimeData(5)}/>
  ))
  .add("time scale with labels", () => (
    <VictoryCandlestick data={getTimeData(5)} labels={(d) => d.x.getFullYear()}/>
  ))
  .add("stacked time scale with labels", () => (
    <VictoryStack labels={(d) => d.x.getFullYear()}>
      <VictoryCandlestick data={getTimeData(5)}/>
      <VictoryCandlestick data={getTimeData(5, "seed-1")}/>
      <VictoryCandlestick data={getTimeData(5, "seed-2")}/>
    </VictoryStack>
  ));

storiesOf("VictoryCandlestick/animating", module)
  .add("animation transitions", () => {
    const updateState = () => ({ data: getTransitionData() });
    const childComponent = (
      <VictoryCandlestick animate={{ duration: 1000 }} labels={(d) => `#${d.x}`}/>
    );
    return getAnimatingComponent(childComponent, updateState);
  });

storiesOf("VictoryCandlestick/issues", module)
  .add("placeholder", () => <VictoryCandlestick/>);
storiesOf("VictoryCandlestick/fixed", module)
  .add("placeholder", () => <VictoryCandlestick/>);


