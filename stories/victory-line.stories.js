/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryStack } from "../packages/victory-stack/src/index";
import { VictoryLine } from "../packages/victory-line/src/index";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme, VictoryLabel } from "../packages/victory-core/src/index";
import { getData, getMixedData, getTimeData, getLogData } from "./data";
import { fromJS } from "immutable";

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
  title: "VictoryLine",
  component: VictoryLine
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryLine style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryLine />
      </VictoryChart>
      <VictoryLine style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine />
      </VictoryChart>
    </div>
  );
};

export const Theme = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryLine data={getMixedData(8)} labels={({ datum }) => datum.x} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine data={getData(8)} />
          <VictoryLine data={getData(8, "seed-1")} />
          <VictoryLine data={getData(8, "seed-2")} />
          <VictoryLine data={getData(8, "seed-3")} />
          <VictoryLine data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine data={getMixedData(8)} labels={({ datum }) => datum.x} />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine data={getData(8)} />
          <VictoryLine data={getData(8, "seed-1")} />
          <VictoryLine data={getData(8, "seed-2")} />
          <VictoryLine data={getData(8, "seed-3")} />
          <VictoryLine data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export const Interpolation = () => {
  const makeInterpolationChart = (interpolation) => (
    <VictoryChart {...defaultChartProps}>
      <VictoryLabel x={175} y={30} style={{ textAnchor: "middle" }} text={interpolation} />
      <VictoryLine data={getData(8)} interpolation={interpolation} />
    </VictoryChart>
  );

  return (
    <div style={containerStyle}>
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
        "stepBefore"
      ].map((interpolation) => makeInterpolationChart(interpolation))}
    </div>
  );
};
export const PolarInterpolation = () => {
  const makeInterpolationChart = (interpolation) => (
    <VictoryChart polar {...defaultChartProps}>
      <VictoryLabel x={175} y={30} style={{ textAnchor: "middle" }} text={interpolation} />
      <VictoryLine data={getData(8)} interpolation={interpolation} />
    </VictoryChart>
  );

  return (
    <div style={containerStyle}>
      {["basis", "cardinal", "catmullRom", "linear"].map((interpolation) =>
        makeInterpolationChart(interpolation)
      )}
    </div>
  );
};

export const DataAccessors = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
            { animal: "Monkey", pet: 5, wild: 40 }
          ]}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryLine
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
            { animal: "Monkey", pet: 5, wild: 40 }
          ]}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} innerRadius={30}>
        <VictoryLine
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
            { animal: "Monkey", pet: 5, wild: 40 }
          ]}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine data={getData(8)} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryLine data={getData(8)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine
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
        <VictoryLine
          data={fromJS([
            { x: "Cat", y: 45, y0: 17 },
            { x: "Dog", y: 85, y0: 6 },
            { x: "Fish", y: 55, y0: 9 },
            { x: "Bird", y: 15, y0: 4 }
          ])}
        />
      </VictoryChart>
    </div>
  );
};

export const PlottingFunctions = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryLine y={(d) => Math.sin(2 * Math.PI * d.x)} />
      </VictoryChart>

      <VictoryChart {...defaultChartProps}>
        <VictoryLine
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryLine
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          y0={(d) => Math.sin(2 * Math.PI * d.x) - 0.5}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryLine y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryLine y={(d) => Math.sin(Math.PI * d.x)} y0={(d) => Math.sin(Math.PI * d.x) - 0.5} />
      </VictoryChart>
    </div>
  );
};

export const Labels = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryLine data={getData(7)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryLine data={getData(7)} labels={["", "", "three", "four", 5, "six"]} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryLine
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
        <VictoryLine
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryLine
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine
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
        <VictoryLine
          data={getData(7)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { stroke: "tomato", strokeWidth: 2 }
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine
          style={{
            labels: {
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
          <VictoryLine data={getData(7)} />
          <VictoryLine data={getData(7, "seed-1")} />
          <VictoryLine data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine data={getData(9)} />
          <VictoryLine data={getData(5, "seed-1")} />
          <VictoryLine data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine data={getData(7)} />
          <VictoryLine data={getData(7, "seed-1")} />
          <VictoryLine data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine data={getData(9)} />
          <VictoryLine data={getData(5, "seed-1")} />
          <VictoryLine data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart domainPadding={{ y: 20 }} polar {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine data={getData(7)} />
          <VictoryLine data={getData(7, "seed-1")} />
          <VictoryLine data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart domainPadding={{ y: 20 }} polar {...defaultChartProps}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine data={getData(9)} />
          <VictoryLine data={getData(5, "seed-1")} />
          <VictoryLine data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};
export const TimeScale = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryLine data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryLine data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryLine data={getTimeData(5)} />
          <VictoryLine data={getTimeData(5, "seed-1")} />
          <VictoryLine data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryLine data={getTimeData(5)} />
          <VictoryLine data={getTimeData(5, "seed-1")} />
          <VictoryLine data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export const LogScale = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryLine data={getLogData(7)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryLine data={getLogData(7)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryLine data={getLogData(7)} />
      </VictoryChart>
    </div>
  );
};

export const Polar = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryLine data={getData(7)} />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} {...defaultChartProps}>
        <VictoryLine data={getData(7)} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} minDomain={{ y: 1 }}>
        <VictoryLine
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 }
          ]}
        />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} {...defaultChartProps}>
        <VictoryLine
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 }
          ]}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryStack>
          <VictoryLine data={getData(5)} />
          <VictoryLine data={getData(5, "seed-1")} />
          <VictoryLine data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart polar innerRadius={50} {...defaultChartProps}>
        <VictoryStack>
          <VictoryLine data={getData(5)} />
          <VictoryLine data={getData(5, "seed-1")} />
          <VictoryLine data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};
