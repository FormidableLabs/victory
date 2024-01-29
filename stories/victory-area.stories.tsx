import { Meta } from "@storybook/react";
import React from "react";
import { fromJS } from "immutable";
import styled from "styled-components";

import { VictoryStack } from "../packages/victory-stack";
import { VictoryArea, Area } from "../packages/victory-area";
import { VictoryTooltip } from "../packages/victory-tooltip";
import {
  VictoryTheme,
  VictoryLabel,
  VictoryLabelStyleObject,
} from "../packages/victory-core";
import { VictoryChart } from "../packages/victory-chart";
import {
  getData,
  getMixedData,
  getTimeData,
  getLogData,
  getDataWithBaseline,
} from "./data";
import { storyContainer } from "./decorators";

const meta: Meta = {
  title: "Victory Charts/SVG Container/VictoryArea",
  component: VictoryArea,
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
      <VictoryArea {...defaultChartProps} />
      <VictoryArea style={parentStyle} />
    </>
  );
};
export const Theme = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea data={getData(8)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryArea data={getData(8)} />
          <VictoryArea data={getData(8, "seed-1")} />
          <VictoryArea data={getData(8, "seed-2")} />
          <VictoryArea data={getData(8, "seed-3")} />
          <VictoryArea data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.grayscale}>
        <VictoryArea data={getData(8)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.grayscale}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryArea data={getData(8)} />
          <VictoryArea data={getData(8, "seed-1")} />
          <VictoryArea data={getData(8, "seed-2")} />
          <VictoryArea data={getData(8, "seed-3")} />
          <VictoryArea data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </>
  );
};
export const Interpolation = () => {
  const makeInterpolationChart = (interpolation) => (
    <VictoryChart {...defaultChartProps}>
      <VictoryLabel
        x={175}
        y={30}
        style={{ textAnchor: "middle" }}
        text={interpolation}
      />
      <VictoryArea data={getData(8)} interpolation={interpolation} />
    </VictoryChart>
  );

  return (
    <>
      {[
        "basis",
        "cardinal",
        "catmullRom",
        "linear",
        "monotoneX",
        "monotoneY",
        "natural",
        "step",
        "stepAfter",
        "stepBefore",
      ].map((interpolation) => makeInterpolationChart(interpolation))}
    </>
  );
};
export const PolarInterpolation = () => {
  const makeInterpolationChart = (interpolation) => (
    <VictoryChart polar {...defaultChartProps}>
      <VictoryLabel
        x={175}
        y={30}
        style={{ textAnchor: "middle" }}
        text={interpolation}
      />
      <VictoryArea data={getData(8)} interpolation={interpolation} />
    </VictoryChart>
  );

  return (
    <>
      {["basis", "cardinal", "catmullRom", "linear"].map((interpolation) =>
        makeInterpolationChart(interpolation),
      )}
    </>
  );
};

export const DataAccessors = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
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
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryArea
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
      <VictoryChart polar {...defaultChartProps}>
        <VictoryArea
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
        <VictoryArea data={getData(8)} y0={(d) => d.y - 1} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryArea data={getData(8)} y0={(d) => d.y - 1} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryArea data={getData(8)} y0={(d) => d.y - 1} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
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
        <VictoryArea
          data={fromJS([
            { x: "Cat", y: 45, y0: 17 },
            { x: "Dog", y: 85, y0: 6 },
            { x: "Fish", y: 55, y0: 9 },
            { x: "Bird", y: 15, y0: 4 },
          ])}
        />
      </VictoryChart>
    </>
  );
};

export const PlottingFunctions = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryArea y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>

      <VictoryChart {...defaultChartProps}>
        <VictoryArea
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryArea
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryArea y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryArea
          y={(d) => Math.sin(Math.PI * d.x)}
          y0={(d) => Math.sin(Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
    </>
  );
};

export const Labels = () => {
  return (
    <>
      <VictoryChart style={parentStyle}>
        <VictoryArea
          data={getData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryArea
          data={getData(7)}
          labels={["", "", "three", "four", "5", "six"]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryArea
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
        <VictoryArea
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryArea
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
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
        <VictoryArea
          data={getData(7)}
          labels={({ datum }) => datum.x}
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
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
          style={{
            labels: labelStyle,
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
          <VictoryArea data={getData(7)} />
          <VictoryArea data={getData(7, "seed-1")} />
          <VictoryArea data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea data={getData(9)} />
          <VictoryArea data={getData(5, "seed-1")} />
          <VictoryArea data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea data={getData(7)} />
          <VictoryArea data={getData(7, "seed-1")} />
          <VictoryArea data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea data={getData(9)} />
          <VictoryArea data={getData(5, "seed-1")} />
          <VictoryArea data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart domainPadding={{ y: 20 }} polar {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea data={getData(7)} />
          <VictoryArea data={getData(7, "seed-1")} />
          <VictoryArea data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart domainPadding={{ y: 20 }} polar {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea data={getData(9)} />
          <VictoryArea data={getData(5, "seed-1")} />
          <VictoryArea data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack>
          <VictoryArea data={getDataWithBaseline(5)} />
          <VictoryArea data={getData(5, "seed-1")} />
          <VictoryArea data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  );
};
export const TimeScale = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryArea
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryArea data={getTimeData(5)} />
          <VictoryArea data={getTimeData(5, "seed-1")} />
          <VictoryArea data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryArea data={getTimeData(5)} />
          <VictoryArea data={getTimeData(5, "seed-1")} />
          <VictoryArea data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  );
};

export const LogScale = () => {
  return (
    <>
      <VictoryChart {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryArea
          data={getLogData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryArea
          data={getLogData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryArea data={getLogData(7)} />
      </VictoryChart>
    </>
  );
};

export const Polar = () => {
  return (
    <>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryArea data={getData(7)} />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} {...defaultChartProps}>
        <VictoryArea data={getData(7)} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryArea
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} {...defaultChartProps}>
        <VictoryArea
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryStack>
          <VictoryArea data={getData(5)} />
          <VictoryArea data={getData(5, "seed-1")} />
          <VictoryArea data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart polar innerRadius={50} {...defaultChartProps}>
        <VictoryStack>
          <VictoryArea data={getData(5)} />
          <VictoryArea data={getData(5, "seed-1")} />
          <VictoryArea data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  );
};

const StyledArea = styled(Area)`
  fill: pink;
`;

export const DisableInlineStyles = () => {
  return (
    <>
      <VictoryArea {...defaultChartProps} disableInlineStyles />
      <VictoryArea
        {...defaultChartProps}
        dataComponent={<StyledArea disableInlineStyles />}
      />
    </>
  );
};
