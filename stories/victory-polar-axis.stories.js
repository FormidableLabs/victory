/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/

import React from "react";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { VictoryPolarAxis } from "../packages/victory-polar-axis/src/index";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";

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

const defaultAxisProps = { style: parentStyle, theme: VictoryTheme.material };

export default {
  title: "VictoryPolarAxis",
  component: VictoryPolarAxis
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

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart polar style={parentStyle} theme={VictoryTheme.material} />
      <VictoryPolarAxis style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart polar style={parentStyle} />
      <VictoryPolarAxis style={parentStyle} />
    </div>
  );
};

export const TickValues = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis {...defaultAxisProps} tickValues={getValues(5)} />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        tickValues={getValues(5)}
      />
      <VictoryPolarAxis {...defaultAxisProps} tickValues={getRandomValues(5)} />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        tickValues={getRandomValues(5)}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        tickValues={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        tickValues={["one", "two", "three", "four", "five"]}
      />
    </div>
  );
};

export const TickFormat = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis
        {...defaultAxisProps}
        tickValues={getValues(5)}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        tickValues={getValues(5)}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        tickValues={getValues(5)}
        tickFormat={(t) => `#${t}`}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        tickValues={getValues(5)}
        tickFormat={(t) => `#${t}`}
      />
    </div>
  );
};

export const Domain = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis {...defaultAxisProps} domain={[-10, 10]} />
      <VictoryPolarAxis {...defaultAxisProps} dependentAxis domain={[-10, 10]} />
      <VictoryPolarAxis {...defaultAxisProps} tickValues={getValues(5)} domain={[-10, 10]} />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        tickValues={getValues(5)}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        tickValues={[8, 9, 10, 11, 12, 13]}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        tickValues={[8, 9, 10, 11, 12, 13]}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        tickValues={["cat", "dog", "bird"]}
        domain={[-2, 2]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        tickValues={["cat", "dog", "bird"]}
        domain={[-2, 2]}
      />
    </div>
  );
};

export const AxisAngle = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={315}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        endAngle={180}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={315}
        endAngle={180}
        tickFormat={["one", "two", "three", "four", "five"]}
      />
    </div>
  );
};

export const AxisValue = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart polar {...defaultAxisProps}>
        <VictoryPolarAxis dependentAxis axisValue={1.5} tickValues={getValues(3)} />
        <VictoryPolarAxis tickValues={getValues(5)} />
      </VictoryChart>
      <VictoryChart polar {...defaultAxisProps}>
        <VictoryPolarAxis dependentAxis axisValue="three" tickValues={getValues(3)} />
        <VictoryPolarAxis tickValues={["one", "two", "three", "four", "five"]} />
      </VictoryChart>
    </div>
  );
};

export const StartAndEndAngle = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis {...defaultAxisProps} startAngle={45} />
      <VictoryPolarAxis {...defaultAxisProps} dependentAxis startAngle={45} />
      <VictoryPolarAxis {...defaultAxisProps} endAngle={90} />
      <VictoryPolarAxis {...defaultAxisProps} dependentAxis endAngle={90} />
      <VictoryPolarAxis {...defaultAxisProps} startAngle={45} endAngle={360 + 45} />
      <VictoryPolarAxis {...defaultAxisProps} dependentAxis startAngle={45} endAngle={360 + 45} />
    </div>
  );
};

export const innerRadius = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart polar {...defaultAxisProps} innerRadius={50}>
        <VictoryPolarAxis dependentAxis tickValues={getValues(5)} />
        <VictoryPolarAxis tickValues={getValues(5)} />
      </VictoryChart>
      <VictoryChart polar {...defaultAxisProps} innerRadius={50} endAngle={180}>
        <VictoryPolarAxis dependentAxis tickValues={getValues(5)} />
        <VictoryPolarAxis tickValues={getValues(5)} />
      </VictoryChart>
    </div>
  );
};

export const labelPlacement = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis {...defaultAxisProps} labelPlacement="parallel" />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        labelPlacement="parallel"
      />
      <VictoryPolarAxis {...defaultAxisProps} labelPlacement="perpendicular" />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        labelPlacement="perpendicular"
      />
      <VictoryPolarAxis {...defaultAxisProps} labelPlacement="vertical" />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        axisAngle={45}
        labelPlacement="vertical"
      />
    </div>
  );
};

export const Style = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis
        theme={VictoryTheme.material}
        style={{
          ...parentStyle,
          axis: { stroke: "#756f6a" },
          axisLabel: { fontSize: 20, padding: 30 },
          grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
          ticks: { stroke: "grey", size: 5 },
          tickLabels: { fontSize: 15, padding: 5 }
        }}
      />
      <VictoryPolarAxis
        dependentAxis
        theme={VictoryTheme.material}
        style={{
          ...parentStyle,
          axis: { stroke: "#756f6a" },
          axisLabel: { fontSize: 20, padding: 30 },
          grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
          ticks: { stroke: "grey", size: 5 },
          tickLabels: { fontSize: 15, padding: 5 }
        }}
      />
    </div>
  );
};

export const Scale = () => {
  return (
    <div style={containerStyle}>
      <VictoryPolarAxis {...defaultAxisProps} tickValues={getTimeValues(5)} scale="time" />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        tickValues={getTimeValues(5)}
        scale="time"
      />
      <VictoryPolarAxis {...defaultAxisProps} tickValues={[1, 5, 10, 50, 500, 10000]} scale="log" />
      <VictoryPolarAxis
        {...defaultAxisProps}
        dependentAxis
        tickValues={[1, 5, 10, 50, 500, 10000]}
        scale="log"
      />
    </div>
  );
};
