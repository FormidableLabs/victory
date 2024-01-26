import { Meta } from '@storybook/react';
import { fromJS } from "immutable";
import React from "react";

import { CanvasGroup, CanvasPoint } from "../packages/victory-canvas";
import { VictoryChart } from "../packages/victory-chart";
import { ScatterSymbolType, VictoryLabelStyleObject, VictoryTheme } from "../packages/victory-core";
import { VictoryScatter } from "../packages/victory-scatter";
import { VictoryStack } from "../packages/victory-stack";
import { VictoryTooltip } from "../packages/victory-tooltip";
import { getData, getMixedData } from "./data";
import { storyContainer } from './decorators';

const meta: Meta = {
  title: "Victory Charts/Canvas Container/Scatter",
  component: VictoryScatter,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const SYMBOLS: ScatterSymbolType[] = [
  "circle",
  "cross",
  "diamond",
  "plus",
  "minus",
  "square",
  "star",
  "triangleDown",
  "triangleUp",
];

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

const defaultChartProps = {
  style: parentStyle,
  theme: VictoryTheme.material,
};

export const DefaultRendering = () => {
  return (
    <>
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
    </>
  );
};

export const Theme = () => {
  return (
    <>
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
    </>
  );
};

export const Symbols = () => {
  return SYMBOLS.map((symbol) => (
    <div key={symbol}>
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
    <>
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
            { x: 4, y: 15 },
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
    </>
  );
};

export const BubbleCharts = () => {
  return (
    <>
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
    </>
  );
};

export const DataAccessors = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
            { animal: "Monkey", pet: 5, wild: 40 },
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
            { animal: "Monkey", pet: 5, wild: 40 },
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
            { animal: "Monkey", pet: 5, wild: 40 },
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
            { a: { b: { c: 3, d: 2 } } },
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
            { x: "Bird", y: 15, y0: 4 },
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
    </>
  );
};

export const Labels = () => {
  return (
    <>
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
          labels={["", "", "three", "four", "5", "six"]}
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
            { x: 5, y: -5, label: "cat" },
          ]}
        />
      </VictoryChart>
    </>
  );
};

export const Tooltips = () => {
  return (
    <>
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
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
    </>
  );
};

const labelStyle: VictoryLabelStyleObject = {
  fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black"),
};

export const Styles = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          data={getData(7)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { fill: "tomato" },
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryScatter
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasPoint />}
          style={{
            labels: labelStyle,
            data: {
              fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black"),
            },
          }}
          labels={({ datum }) => datum.x}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
          ]}
        />
      </VictoryChart>
    </>
  );
};

export const Stacked = () => {
  return (
    <>
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
    </>
  );
};
