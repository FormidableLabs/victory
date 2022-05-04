/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/

import { fromJS } from "immutable";
import React from "react";
import { CanvasGroup, CanvasPoint } from "victory-canvas";
import { VictoryChart } from "victory-chart";
import { VictoryTheme } from "victory-core";
import { VictoryScatter } from "victory-scatter";
import { VictoryStack } from "victory-stack";
import { VictoryTooltip } from "victory-tooltip";
import { getData, getMixedData } from "./data";

const SYMBOLS = [
  "circle",
  "cross",
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
  title: "Victory Canvas/Scatter",
  component: VictoryScatter
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryScatter
        style={parentStyle}
        groupComponent={<CanvasGroup />}
        dataComponent={<CanvasPoint />}
      />
      <VictoryChart style={parentStyle}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
        />
      </VictoryChart>
      <VictoryScatter
        groupComponent={<CanvasGroup />}
        dataComponent={<CanvasPoint />}
        style={parentStyle}
        theme={VictoryTheme.material}
      />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
        />
      </VictoryChart>
    </div>
  );
};

export const Theme = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryScatter
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-2")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-3")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-4")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-2")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-3")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(8, "seed-4")}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export const Symbols = () => {
  return SYMBOLS.map((symbol) => (
    <div style={containerStyle} key={symbol}>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getMixedData(8)}
          symbol={symbol}
          size={10}
          labels={() => symbol}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getMixedData(8)}
          symbol={symbol}
          size={10}
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
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getMixedData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getMixedData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
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
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
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
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25} horizontal>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
          maxBubbleSize={25}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
          minBubbleSize={10}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
          minBubbleSize={8}
          maxBubbleSize={20}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
          maxBubbleSize={25}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
          size={3}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={25}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(10)}
          bubbleProperty="x"
          symbol="plus"
        />
      </VictoryChart>
    </div>
  );
};

export const DataAccessors = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
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
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
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
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
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
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(8)}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
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
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={fromJS([
            { x: "Cat", y: 45, y0: 17 },
            { x: "Dog", y: 85, y0: 6 },
            { x: "Fish", y: 55, y0: 9 },
            { x: "Bird", y: 15, y0: 4 }
          ])}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
        />
      </VictoryChart>
    </div>
  );
};

export const Labels = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(7)}
          labels={["", "", "three", "four", 5, "six"]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: -2, label: "bird" },
            { x: 5, y: -5, label: "cat" }
          ]}
        />
      </VictoryChart>
    </div>
  );
};

export const Tooltips = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(5)}
          labels={["one", "two", 3, "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
    </div>
  );
};

export const Styles = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(7)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { fill: "tomato" }
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          style={{
            labels: {
              fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black")
            },
            data: {
              fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black")
            }
          }}
          labels={({ datum }) => datum.x}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 }
          ]}
        />
      </VictoryChart>
    </div>
  );
};

export const Stacked = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(9)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(5, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(3, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(9)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(5, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(3, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart domainPadding={{ y: 20 }} polar {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart domainPadding={{ y: 20 }} polar {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(9)}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(5, "seed-1")}
          />
          <VictoryScatter
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasPoint />}
            data={getData(3, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};
