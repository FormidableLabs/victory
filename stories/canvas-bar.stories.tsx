import { fromJS } from "immutable";
import React from "react";
import { Meta } from "@storybook/react";

import { VictoryBar } from "../packages/victory-bar";
import { CanvasBar, CanvasGroup } from "../packages/victory-canvas";
import { VictoryChart } from "../packages/victory-chart";
import {
  VictoryLabel,
  VictoryLabelStyleObject,
  VictoryTheme,
} from "../packages/victory-core";
import { VictoryGroup } from "../packages/victory-group";
import { VictoryPolarAxis } from "../packages/victory-polar-axis";
import { VictoryStack } from "../packages/victory-stack";
import { VictoryTooltip } from "../packages/victory-tooltip";
import { getData, getDataWithBaseline, getMixedData } from "./data";
import { storyContainer } from './decorators';

const meta: Meta<typeof VictoryBar> = {
  title: "Victory Charts/Canvas Container/Bar",
  component: VictoryBar,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

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
      <VictoryBar
        groupComponent={<CanvasGroup />}
        dataComponent={<CanvasBar />}
        {...defaultChartProps}
      />
      <VictoryBar
        groupComponent={<CanvasGroup />}
        dataComponent={<CanvasBar />}
        style={parentStyle}
      />
    </>
  );
};

export const Theme = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(8)}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-2")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-3")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-4")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.grayscale}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(8)}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.grayscale}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-2")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-3")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(8, "seed-4")}
          />
        </VictoryStack>
      </VictoryChart>
    </>
  );
};

export const Alignment = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          alignment="start"
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          alignment="start"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          alignment="middle"
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          alignment="middle"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          alignment="end"
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          alignment="end"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(5)}
          alignment="start"
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(5)}
          alignment="start"
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(5)}
          alignment="end"
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(5)}
          alignment="end"
        />
      </VictoryChart>
    </>
  );
};

export const BarRatio = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(2)}
          barRatio={0.01}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(50)}
          barRatio={0.01}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={0.01}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={0.01}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(2)}
          barRatio={0.5}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(50)}
          barRatio={0.5}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={0.5}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={0.5}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(2)}
          barRatio={1}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(50)}
          barRatio={1}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={1}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={1}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(2)}
          barRatio={1.5}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(50)}
          barRatio={1.5}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={1.5}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barRatio={1.5}
        />
      </VictoryChart>
    </>
  );
};

export const BarWidth = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barWidth={5}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barWidth={10}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barWidth={20}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          barWidth={({ datum }) => datum.x * 4}
        />
      </VictoryChart>
    </>
  );
};

export const CornerRadius = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          cornerRadius={1}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          cornerRadius={5}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          cornerRadius={7}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          cornerRadius={7}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={20}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={20}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={{
            topLeft: 5,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 0,
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={{
            topLeft: 5,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 0,
          }}
        />
      </VictoryChart>
      <VictoryChart polar innerRadius={60} {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={[
            { x: 45, y: 6 },
            { x: 90, y: 30 },
            { x: 135, y: 65 },
            { x: 180, y: 50 },
            { x: 270, y: 40 },
            { x: 315, y: 30 },
          ]}
          style={{ data: { fill: "tomato", width: 40 } }}
          cornerRadius={{
            topRight: 1,
            topLeft: 20,
            bottomRight: 5,
            bottomLeft: 0,
          }}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={[
            { x: 45, y: 6 },
            { x: 90, y: 30 },
            { x: 135, y: 65 },
            { x: 180, y: 50 },
            { x: 270, y: 40 },
            { x: 315, y: 30 },
          ]}
          style={{ data: { fill: "tomato", width: 40 } }}
          cornerRadius={{
            topRight: 1,
            topLeft: 20,
            bottomRight: 5,
            bottomLeft: 0,
          }}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
        />
      </VictoryChart>
    </>
  );
};

export const Data = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
          ]}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(8)}
          y0={(d) => d.y - d.x}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(8)}
          y0={(d) => d.y - d.x}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
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
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={fromJS([
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: -2, label: "bird" },
            { x: 5, y: -5, label: "cat" },
          ])}
        />
      </VictoryChart>
    </>
  );
};

export const Labels = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(7)}
          labels={["", "", "three", "four", "5", "six"]}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: -2, label: "bird" },
            { x: 5, y: -5, label: "cat" },
          ]}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} domainPadding={{ y: 20 }}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: 2, label: "bird" },
            { x: 5, y: 5, label: "cat" },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  );
};

export const Tooltips = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(5)}
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          data={getData(5)}
          style={{ data: { width: 20 } }}
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  );
};

const labelStyle: VictoryLabelStyleObject = {
  fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black"),
};

export const Style = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          labels={({ datum }) => datum.y}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: {
              fill: "tomato",
              fillOpacity: 0.7,
              stroke: "tomato",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          style={{
            labels: labelStyle,
            data: {
              stroke: ({ datum }) => (datum.y > 75 ? "red" : "transparent"),
              strokeWidth: 3,
              opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4),
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

export const StackedBars = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7)}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-1")}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-2")}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(9)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(3, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack
          labels={({ datum }) => datum._y1.toPrecision(2)}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={8}>
        <VictoryStack
          labels={({ datum }) => datum._y1.toPrecision(2)}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(90)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(50, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(200, "seed-2")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(30, "seed-3")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(200, "seed-4")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(100, "seed-5")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(200, "seed-6")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(190, "seed-7")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getDataWithBaseline(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-2")}
          />
        </VictoryStack>
      </VictoryChart>
    </>
  );
};

export const GroupedBars = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(3)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(3, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(3, "seed-2")}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryGroup offset={10} labels={({ datum }) => datum.x}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(3, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(2, "seed-2")}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed-1")}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed-1")}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed-1")}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getMixedData(3, "seed-1")}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          style={{ data: { width: 15 } }}
        >
          <VictoryStack colorScale="red">
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3)}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-1")}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-2")}
            />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3)}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-3")}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-4")}
            />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3)}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-5")}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-6")}
            />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          style={{ data: { width: 15 } }}
        >
          <VictoryStack colorScale="red">
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3)}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-1")}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-2")}
            />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3)}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-3")}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-4")}
            />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3)}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-5")}
            />
            <VictoryBar
              groupComponent={<CanvasGroup />}
              dataComponent={<CanvasBar />}
              data={getData(3, "seed-6")}
            />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </>
  );
};
export const PolarBars = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          style={{ data: { width: 20 } }}
          data={getData(7)}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          style={{ data: { stroke: "red", strokeWidth: 2 } }}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar endAngle={180}>
        <VictoryBar
          groupComponent={<CanvasGroup />}
          dataComponent={<CanvasBar />}
          style={{ data: { stroke: "red", strokeWidth: 2 } }}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryStack colorScale="qualitative">
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-2")}
          />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryStack colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(7, "seed-2")}
          />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryGroup
          offset={25}
          colorScale="qualitative"
          style={{ data: { width: 15 } }}
        >
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5, "seed-2")}
          />
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar innerRadius={50}>
        <VictoryGroup
          offset={25}
          colorScale="qualitative"
          style={{ data: { width: 15 } }}
        >
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5, "seed-2")}
          />
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        {...defaultChartProps}
        polar
        endAngle={180}
        innerRadius={50}
      >
        <VictoryStack colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5)}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5, "seed-1")}
          />
          <VictoryBar
            groupComponent={<CanvasGroup />}
            dataComponent={<CanvasBar />}
            data={getData(5, "seed-2")}
          />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  );
};
