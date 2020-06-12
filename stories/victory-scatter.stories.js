/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/

import React from "react";
import { VictoryStack } from "../packages/victory-stack/src/index";
import { VictoryScatter } from "../packages/victory-scatter/src/index";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme, VictoryLabel } from "../packages/victory-core/src/index";
import { getData, getMixedData, getTimeData, getLogData } from "./data";
import { fromJS } from "immutable";

const SYMBOLS = [
  "circle",
  "diamond",
  "plus",
  "minus",
  "square",
  "star",
  "triangleDown",
  "triangleUp"
];


const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
};

const defaultChartProps = {
  style: parentStyle,
  theme: VictoryTheme.material
};

export default {
  title: "VictoryScatter",
  component: VictoryScatter
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryScatter style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryScatter />
      </VictoryChart>
      <VictoryScatter style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryScatter />
      </VictoryChart>
    </div>
  );
};

export const Theme = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryScatter data={getMixedData(8)} labels={({ datum }) => datum.x} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryScatter data={getData(8)} />
          <VictoryScatter data={getData(8, "seed-1")} />
          <VictoryScatter data={getData(8, "seed-2")} />
          <VictoryScatter data={getData(8, "seed-3")} />
          <VictoryScatter data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryScatter data={getMixedData(8)} labels={({ datum }) => datum.x} />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryScatter data={getData(8)} />
          <VictoryScatter data={getData(8, "seed-1")} />
          <VictoryScatter data={getData(8, "seed-2")} />
          <VictoryScatter data={getData(8, "seed-3")} />
          <VictoryScatter data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export const Symbols = () => {
  return SYMBOLS.map(symbol => (
    <div style={containerStyle} key={symbol}>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          data={getMixedData(8)}
          symbol={symbol} size={10}
          labels={() => symbol}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryScatter
          data={getMixedData(8)}
          symbol={symbol} size={10}
          labels={() => symbol}
        />
      </VictoryChart>
    </div>
  ));
};

export const FunctionalSymbols = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          data={getMixedData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryScatter
          data={getMixedData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          data={[
            { x: 1, y: 45, symbol: "star" },
            { x: 2, y: 85 },
            { x: 3, y: 55, symbol: "square" },
            { x: 4, y: 15 }
          ]}
          symbol="plus"
          size={8}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar innerRadius={30}>
        <VictoryScatter
          data={getData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
    </div>
  );
};

export const BubbleCharts = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter data={getData(10)} bubbleProperty="x" />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25} horizontal>
        <VictoryScatter data={getData(10)} bubbleProperty="x" />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter data={getData(10)} bubbleProperty="x" maxBubbleSize={25} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter data={getData(10)} bubbleProperty="x" minBubbleSize={10} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter data={getData(10)} bubbleProperty="x" minBubbleSize={8} maxBubbleSize={20} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryScatter data={getData(10)} bubbleProperty="x" maxBubbleSize={25} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter data={getData(10)} bubbleProperty="x" size={3} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter data={getData(10)} bubbleProperty="x" symbol="plus" />
      </VictoryChart>
    </div>
  );
};

export const DataAccessors = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
            { animal: "Monkey", pet: 5, wild: 40 }
          ]}
          labels={({ datum }) => datum.animal}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryScatter
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
            { animal: "Monkey", pet: 5, wild: 40 }
          ]}
          labels={({ datum }) => datum.animal}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} innerRadius={30}>
        <VictoryScatter
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
            { animal: "Monkey", pet: 5, wild: 40 }
          ]}
          labels={({ datum }) => datum.animal}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter data={getData(8)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          data={[
            { a: { b: { c: 1, d: 1 } } },
            { a: { b: { c: 2, d: 3 } } },
            { a: { b: { c: 3, d: 2 } } }
          ]}
          x={"a.b.c"}
          y={"a.b.d"}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          data={fromJS([
            { x: "Cat", y: 45, y0: 17 },
            { x: "Dog", y: 85, y0: 6 },
            { x: "Fish", y: 55, y0: 9 },
            { x: "Bird", y: 15, y0: 4 }
          ])}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryScatter y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>
    </div>
  );
};



// storiesOf("VictoryScatter.labels", module)
//   .addDecorator(getChartDecorator({ domainPadding: 25 }))
//   .add("function labels", () => (
//     <VictoryScatter data={getData(7)} labels={({ datum }) => `x: ${datum.x}`} />
//   ))
//   .add("array labels", () => (
//     <VictoryScatter data={getData(7)} labels={["", "", "three", "four", 5, "six"]} />
//   ))
//   .add("data labels", () => (
//     <VictoryScatter
//       data={[
//         { x: 1, y: 2, label: "cat" },
//         { x: 2, y: 5, label: "dog" },
//         { x: 3, y: 3, label: "dog" },
//         { x: 4, y: -2, label: "bird" },
//         { x: 5, y: -5, label: "cat" }
//       ]}
//     />
//   ))
//   .add("data labels (horizontal)", () => (
//     <VictoryScatter
//       horizontal
//       data={[
//         { x: 1, y: 2, label: "cat" },
//         { x: 2, y: 5, label: "dog" },
//         { x: 3, y: 3, label: "dog" },
//         { x: 4, y: -2, label: "bird" },
//         { x: 5, y: -5, label: "cat" }
//       ]}
//     />
//   ));

// storiesOf("VictoryScatter.tooltips", module)
//   .addDecorator(getChartDecorator({ domainPadding: 25 }))
//   .add("tooltips", () => (
//     <VictoryScatter
//       data={getData(5)}
//       labels={({ datum }) => `x: ${datum.x}`}
//       labelComponent={<VictoryTooltip active />}
//     />
//   ))
//   .add("tooltips (negative)", () => (
//     <VictoryScatter
//       data={getMixedData(5)}
//       labels={({ datum }) => `x: ${datum.x}`}
//       labelComponent={<VictoryTooltip active />}
//     />
//   ))
//   .add("tooltips (horizontal)", () => (
//     <VictoryScatter
//       horizontal
//       data={getMixedData(5)}
//       labels={({ datum }) => `x: ${datum.x}`}
//       labelComponent={<VictoryTooltip active />}
//     />
//   ))
//   .add("tooltips with long and short strings", () => (
//     <VictoryScatter
//       data={getData(5)}
//       labels={["one", "two", 3, "wow, four tooltips", "five"]}
//       labelComponent={<VictoryTooltip active />}
//     />
//   ));

// storiesOf("VictoryScatter.style", module)
//   .addDecorator(getChartDecorator({ domainPadding: 25 }))
//   .add("with styles", () => (
//     <VictoryScatter
//       data={getData(7)}
//       size={5}
//       labels={({ datum }) => datum.x}
//       style={{
//         labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
//         data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
//       }}
//     />
//   ))
//   .add("with functional styles", () => (
//     <VictoryScatter
//       size={5}
//       style={{
//         labels: {
//           fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black")
//         },
//         data: {
//           stroke: ({ datum }) => (datum.y > 75 ? "red" : "transparent"),
//           strokeWidth: 3,
//           opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4)
//         }
//       }}
//       labels={({ datum }) => datum.x}
//       data={[
//         { x: "Cat", y: 62 },
//         { x: "Dog", y: 91 },
//         { x: "Fish", y: 55 },
//         { x: "Bird", y: 55 }
//       ]}
//     />
//   ));

// storiesOf("VictoryScatter.stacked", module)
//   .addDecorator(getChartDecorator({ domainPadding: 25 }))
//   .add("stacked points", () => (
//     <VictoryStack colorScale="qualitative">
//       <VictoryScatter data={getData(7)} size={5} />
//       <VictoryScatter data={getData(7, "seed-1")} size={5} />
//       <VictoryScatter data={getData(7, "seed-2")} size={5} />
//     </VictoryStack>
//   ))
//   .add("stacked points (horizontal)", () => (
//     <VictoryStack horizontal colorScale="qualitative">
//       <VictoryScatter data={getData(7)} size={5} />
//       <VictoryScatter data={getData(7, "seed-1")} size={5} />
//       <VictoryScatter data={getData(7, "seed-2")} size={5} />
//     </VictoryStack>
//   ))
//   .add("stacked points with mixed lengths", () => (
//     <VictoryStack colorScale="qualitative">
//       <VictoryScatter data={getData(9)} size={5} />
//       <VictoryScatter data={getData(5, "seed-1")} size={5} />
//       <VictoryScatter data={getData(3, "seed-2")} size={5} />
//     </VictoryStack>
//   ))
//   .add("stacked points with labels", () => (
//     <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
//       <VictoryScatter data={getData(7)} size={5} />
//       <VictoryScatter data={getData(7, "seed-1")} size={5} />
//       <VictoryScatter data={getData(7, "seed-2")} size={5} />
//     </VictoryStack>
//   ))
//   .add("stacked negative points", () => (
//     <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
//       <VictoryScatter data={getMixedData(7)} size={5} />
//       <VictoryScatter data={getMixedData(7, "seed-1")} size={5} />
//       <VictoryScatter data={getMixedData(7, "seed-2")} size={5} />
//     </VictoryStack>
//   ));

// storiesOf("VictoryScatter.scale", module)
//   .addDecorator(getChartDecorator({ scale: { x: "time" }, domainPadding: 25 }))
//   .add("time scale", () => <VictoryScatter data={getTimeData(5)} />)
//   .add("time scale with labels", () => (
//     <VictoryScatter data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
//   ))
//   .add("stacked time scale with labels", () => (
//     <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
//       <VictoryScatter data={getTimeData(5)} />
//       <VictoryScatter data={getTimeData(5, "seed-1")} />
//       <VictoryScatter data={getTimeData(5, "seed-2")} />
//     </VictoryStack>
//   ));
// storiesOf("VictoryScatter.scale", module)
//   .addDecorator(getChartDecorator({ scale: { y: "log" }, domainPadding: 25 }))
//   .add("log scale", () => <VictoryScatter data={getLogData(7)} />);

// storiesOf("VictoryScatter.polar", module).add("Polar Scatter", () => (
//   <VictoryScatter polar theme={VictoryTheme.material} data={getData(7)} />
// ));
// storiesOf("VictoryScatter.polar", module)
//   .addDecorator(getPolarChartDecorator())
//   .add("Polar Scatter with chart", () => <VictoryScatter data={getData(7)} />)
//   .add("Polar Scatter with categorical data", () => (
//     <VictoryScatter
//       data={[
//         { x: "Cat", y: 62 },
//         { x: "Dog", y: 91 },
//         { x: "Fish", y: 55 },
//         { x: "Bird", y: 55 },
//         { x: "Frog", y: 75 }
//       ]}
//     />
//   ))
//   .add("Polar stacked Scatter", () => (
//     <VictoryStack colorScale="qualitative">
//       <VictoryScatter data={getData(7)} />
//       <VictoryScatter data={getData(7, "seed-1")} />
//       <VictoryScatter data={getData(7, "seed-2")} />
//     </VictoryStack>
//   ));
// storiesOf("VictoryScatter.polar", module)
//   .addDecorator(getPolarChartDecorator({ innerRadius: 50 }))
//   .add("Polar Scatter with innerRadius", () => <VictoryScatter data={getData(7)} />)
//   .add("Polar stacked Scatter with innerRadius", () => (
//     <VictoryStack colorScale="qualitative">
//       <VictoryScatter data={getData(7)} />
//       <VictoryScatter data={getData(7, "seed-1")} />
//       <VictoryScatter data={getData(7, "seed-2")} />
//     </VictoryStack>
//   ));
