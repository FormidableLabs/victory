import { Meta } from "@storybook/react";
import React from "react";
import { range } from "lodash";
import seedrandom from "seedrandom";

import { VictoryAxis } from "../packages/victory-axis";
import { VictoryBar } from "../packages/victory-bar";
import { VictoryBrushLine } from "../packages/victory-brush-line";
import { VictoryScatter } from "../packages/victory-scatter";
import { VictoryTheme } from "../packages/victory-core";
import { VictoryChart } from "../packages/victory-chart";
import { storyContainer } from "./decorators";

const meta: Meta = {
  title: "Victory Charts/SVG Container/VictoryAxis",
  component: VictoryAxis,
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

const getTimeValues = (num) => {
  const current = 1523389495000;
  return range(num).map((v) => {
    return new Date((current / num) * (v + 1));
  });
};

const getValues = (num, min = 0, step = 1) => {
  return range(num).map((v) => v * step + min);
};

const getRandomValues = (num, seed = "random") => {
  const baseSeed = seedrandom(seed);
  const rand = () => Math.round(baseSeed.quick() * 100);
  const result = range(num).map(() => rand());
  return result.sort((a, b) => a - b);
};

export const DefaultRendering = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps} />
      <VictoryChart {...defaultChartProps} domain={[-1, 1]} />
      <VictoryChart style={parentStyle} />
      <VictoryChart style={parentStyle} domain={[-1, 1]} />
    </>
  );
};

export const AxisValue = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis tickValues={[1, 2, 3, 4, 5]} />
        <VictoryAxis dependentAxis axisValue={3} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis axisValue={"zero"} />
        <VictoryAxis dependentAxis tickValues={["-", "zero", "+"]} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} scale={{ x: "time" }}>
        <VictoryAxis
          tickValues={[
            new Date(1985, 1, 1),
            new Date(1995, 1, 1),
            new Date(2005, 1, 1),
            new Date(2015, 1, 1),
          ]}
          tickFormat={(t) => t.getFullYear()}
        />
        <VictoryAxis dependentAxis axisValue={new Date(2000, 1, 1)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBar
          data={[
            { x: "a", y: 1 },
            { x: "b", y: 2 },
            { x: "c", y: 5 },
          ]}
        />
        <VictoryAxis dependentAxis axisValue="b" />
        <VictoryAxis />
      </VictoryChart>
    </>
  );
};

export const TickValues = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis tickValues={getValues(5)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis dependentAxis tickValues={getValues(5)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis tickValues={getRandomValues(5)} />
        <VictoryAxis dependentAxis tickValues={getRandomValues(5)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis tickValues={["one", "two", "three", "four"]} />
        <VictoryAxis
          dependentAxis
          tickValues={["one", "two", "three", "four"]}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal scale={{ x: "time" }}>
        <VictoryAxis tickValues={getTimeValues(5)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} scale={{ x: "time" }}>
        <VictoryAxis tickValues={getTimeValues(5)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal scale={{ x: "log" }}>
        <VictoryAxis tickValues={[1, 3, 5, 7, 10, 50, 100, 500, 1000]} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} scale={{ x: "log" }}>
        <VictoryAxis tickValues={[1, 3, 5, 7, 10, 50, 100, 500, 1000]} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis
          label={"Empty Tick Values"}
          tickValues={[]}
          orientation="right"
        />
      </VictoryChart>
    </>
  );
};

export const TickFormat = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis
          tickValues={getValues(5)}
          tickFormat={["one", "two", "three", "four", "five"]}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis tickValues={getValues(5)} tickFormat={(t) => `#${t}`} />
      </VictoryChart>
    </>
  );
};

export const WithDomain = () => {
  return (
    <>
      <VictoryAxis {...defaultChartProps} domain={[-10, 10]} />
      <VictoryAxis
        {...defaultChartProps}
        domain={[-10, 10]}
        tickValues={getValues(5)}
      />
      <VictoryAxis
        {...defaultChartProps}
        domain={[-10, 10]}
        tickValues={[8, 9, 10, 11, 12, 13]}
      />
      <VictoryAxis
        {...defaultChartProps}
        domain={[-2, 2]}
        tickValues={["cat", "dog", "bird"]}
      />
      <VictoryChart {...defaultChartProps} domain={[1, 4]}>
        <VictoryScatter
          data={[
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryAxis dependentAxis />
        <VictoryAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domain={[1, 4]}>
        <VictoryScatter
          data={[
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryAxis dependentAxis invertAxis />
        <VictoryAxis />
      </VictoryChart>
    </>
  );
};

export const FixLabelOverlap = () => {
  return (
    <>
      <VictoryAxis
        {...defaultChartProps}
        fixLabelOverlap
        tickValues={getValues(30)}
      />
      <VictoryAxis
        {...defaultChartProps}
        dependentAxis
        fixLabelOverlap
        tickValues={getValues(30)}
      />
      <VictoryAxis
        {...defaultChartProps}
        fixLabelOverlap
        tickValues={getRandomValues(30)}
      />
      <VictoryAxis
        {...defaultChartProps}
        dependentAxis
        fixLabelOverlap
        tickValues={getRandomValues(30)}
      />
      <VictoryAxis
        {...defaultChartProps}
        fixLabelOverlap
        scale="time"
        tickValues={getTimeValues(30)}
      />
      <VictoryAxis
        {...defaultChartProps}
        fixLabelOverlap
        dependentAxis
        scale="time"
        tickValues={getTimeValues(30)}
      />
    </>
  );
};

export const Offsets = () => {
  return (
    <>
      <VictoryAxis {...defaultChartProps} dependentAxis offsetX={250} />
      <VictoryAxis {...defaultChartProps} offsetY={250} />
    </>
  );
};

export const Orientation = () => {
  return (
    <>
      <VictoryAxis
        {...defaultChartProps}
        tickValues={getValues(5)}
        orientation="top"
      />
      <VictoryAxis
        {...defaultChartProps}
        tickValues={getValues(5)}
        orientation="bottom"
      />
      <VictoryAxis
        {...defaultChartProps}
        tickValues={getValues(5)}
        orientation="left"
      />
      <VictoryAxis
        {...defaultChartProps}
        tickValues={getValues(5)}
        orientation="right"
      />
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis orientation="top" />
        <VictoryAxis dependentAxis orientation="right" />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis orientation="top" invertAxis />
        <VictoryAxis dependentAxis orientation="right" invertAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domain={[-1, 1]}>
        <VictoryAxis orientation="top" />
        <VictoryAxis dependentAxis orientation="right" />
      </VictoryChart>
    </>
  );
};

export const Style = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis
          label="Label"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 20, padding: 30 },
            grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 15, padding: 5 },
          }}
        />
      </VictoryChart>
    </>
  );
};

export const WithMultilineLabels = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis
          tickValues={getValues(5, -2)}
          tickFormat={(tick) => (tick >= 0 ? tick : `minus\n${-tick}`)}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis
          tickValues={getValues(5, -2)}
          tickFormat={(tick) => (tick >= 0 ? tick : `minus\n${-tick}`)}
          orientation="top"
        />
      </VictoryChart>
    </>
  );
};

export const BrushAxis = () => {
  return (
    <>
      <VictoryAxis label="Label" axisComponent={<VictoryBrushLine />} />
    </>
  );
};

export const BrushAxisWithDomain = () => {
  return (
    <>
      <VictoryAxis
        label="Label"
        axisComponent={<VictoryBrushLine brushDomain={[0.25, 0.5]} />}
      />
    </>
  );
};

export const BrushAxisGridLine = () => {
  return (
    <>
      <VictoryAxis label="Label" gridComponent={<VictoryBrushLine />} />
    </>
  );
};

export const BrushAxisGridLineWithDomain = () => {
  return (
    <>
      <VictoryAxis
        label="Label"
        gridComponent={<VictoryBrushLine brushDomain={[0.25, 0.5]} />}
      />
    </>
  );
};

export const BrushAxisGridLineStyles = () => {
  return (
    <>
      <VictoryAxis
        label="Label"
        gridComponent={
          <VictoryBrushLine
            brushDomain={[0.25, 0.5]}
            brushAreaStyle={{
              fill: "orange",
              stroke: "tomato",
              strokeWidth: 2,
            }}
            brushStyle={{ fill: "teal", stroke: "navy", strokeWidth: 2 }}
            handleStyle={{ strokeWidth: 1, stroke: "grey" }}
          />
        }
      />
    </>
  );
};

export const BrushAxisGridLineWidth = () => {
  return (
    <>
      <VictoryAxis
        label="Label"
        gridComponent={
          <VictoryBrushLine
            brushDomain={[0.25, 0.5]}
            brushWidth={40}
            brushAreaWidth={20}
            handleWidth={4}
            brushAreaStyle={{
              fill: "orange",
              stroke: "tomato",
              strokeWidth: 2,
            }}
            brushStyle={{ fill: "teal", stroke: "navy", strokeWidth: 2 }}
            handleStyle={{ strokeWidth: 1, stroke: "grey" }}
          />
        }
      />
    </>
  );
};
