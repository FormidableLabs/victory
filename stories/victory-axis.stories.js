/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryAxis } from "../packages/victory-axis/src";
import { VictoryBar } from "../packages/victory-bar/src";
import { VictoryScatter } from "../packages/victory-scatter/src";
import { VictoryTheme } from "../packages/victory-core/src";
import { VictoryChart } from "../packages/victory-chart/src";
import { range } from "lodash";
import seedrandom from "seedrandom";

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

const getTimeValues = (num) => {
  const current = 1523389495000;
  return range(num).map((v) => {
    return new Date((current / num) * (v + 1));
  });
};

const getValues = (num, min, step) => {
  min = min || 0;
  step = step || 1;
  return range(num).map((v) => v * step + min);
};

const getRandomValues = (num, seed) => {
  seed = seed || "random";
  const baseSeed = seedrandom(seed);
  const rand = () => Math.round(baseSeed.quick() * 100);
  const result = range(num).map(() => rand());
  return result.sort((a, b) => a - b);
};

export default {
  title: "VictoryAxis",
  component: VictoryAxis
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} />
      <VictoryChart {...defaultChartProps} domain={[-1, 1]} />
      <VictoryChart style={parentStyle} />
      <VictoryChart style={parentStyle} domain={[-1, 1]} />
    </div>
  );
};

export const AxisValue = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis tickValues={[1, 2, 3, 4, 5]} />
        <VictoryAxis dependentAxis axisValue={3} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis axisValue={"zero"} />
        <VictoryAxis dependentAxis tickValues={["-", "zero", "+"]} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} scale={{ x: "time " }}>
        <VictoryAxis
          tickValues={[
            new Date(1985, 1, 1),
            new Date(1995, 1, 1),
            new Date(2005, 1, 1),
            new Date(2015, 1, 1)
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
            { x: "c", y: 5 }
          ]}
        />
        <VictoryAxis dependentAxis axisValue="b" />
        <VictoryAxis />
      </VictoryChart>
    </div>
  );
};

export const TickValues = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const TickFormat = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis
          tickValues={getValues(5)}
          tickFormat={["one", "two", "three", "four", "five"]}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis tickValues={getValues(5)} tickFormat={(t) => `#${t}`} />
      </VictoryChart>
    </div>
  );
};

export const WithDomain = () => {
  return (
    <div style={containerStyle}>
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
            { x: 3, y: 3 }
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
            { x: 3, y: 3 }
          ]}
        />
        <VictoryAxis dependentAxis invertAxis />
        <VictoryAxis />
      </VictoryChart>
    </div>
  );
};

export const FixLabelOverlap = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Offsets = () => {
  return (
    <div style={containerStyle}>
      <VictoryAxis {...defaultChartProps} dependentAxis offsetX={250} />
      <VictoryAxis {...defaultChartProps} offsetY={250} />
    </div>
  );
};

export const Orientation = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Style = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryAxis
          label="Label"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 20, padding: 30 },
            grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 15, padding: 5 }
          }}
        />
      </VictoryChart>
    </div>
  );
};

export const WithMultilineLabels = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};
