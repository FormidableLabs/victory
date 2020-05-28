/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryStack } from "victory-stack/src";
import { VictoryArea } from "victory-area/src";
import { VictoryTooltip } from "victory-tooltip/src";
import { VictoryTheme, VictoryLabel } from "victory-core/src";
import { VictoryChart } from "victory-chart/src";
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
  style: parentStyle, theme: VictoryTheme.material
};

const makeChart = (areaProps, chartProps = defaultChartProps) => (
  <VictoryChart {...chartProps}>
    <VictoryArea {...areaProps}/>
  </VictoryChart>
);

export default {
  title: "VictoryArea",
  component: VictoryArea
};

export const DefaultRendering = () => <VictoryArea />;
export const Theme = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
}
export const Interpolation = () => {
  const makeInterpolationChart = (interpolation) => (
    <VictoryChart {...defaultChartProps}>
      <VictoryLabel x={175} y={30} style={{ textAnchor: "middle" }} text={interpolation} />
      <VictoryArea data={getData(8)} interpolation={interpolation}/>
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
        ].map(interpolation => makeInterpolationChart(interpolation))
      }
    </div>
  );
}
export const PolarInterpolation = () => {
  const makeInterpolationChart = (interpolation) => (
    <VictoryChart polar {...defaultChartProps}>
      <VictoryLabel x={175} y={30} style={{ textAnchor: "middle" }} text={interpolation} />
      <VictoryArea data={getData(8)} interpolation={interpolation}/>
    </VictoryChart>
  );

  return (
    <div style={containerStyle}>
    {
      ["basis","cardinal","catmullRom","linear",]
        .map(interpolation => makeInterpolationChart(interpolation))
    }
    </div>
  );
}

export const DataAccessors = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 }
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
            { animal: "Bird", pet: 15, wild: 40 }
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
            { animal: "Bird", pet: 15, wild: 40 }
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
            { a: { b: { c: 3, d: 2 } } }
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
          { x: "Bird", y: 15, y0: 4 }
        ])}
      />
     </VictoryChart>
    </div>
  );
}

export const PlottingFunctions = () => {
  return (
    <div style={containerStyle}>
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
          y0={(d) => Math.sin(Math.PI * d.x) - 0.5 }
        />
      </VictoryChart>
    </div>
  );
}

export const Labels = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryArea data={getData(7)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryArea data={getData(7)} labels={["", "", "three", "four", 5, "six"]} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
      <VictoryArea
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
}

export const Tooltips = () => {
  return (
    <div style={containerStyle}>
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
          labels={["one", "two", 3, "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
    </div>
  );
}

export const Styles = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
          data={getData(7)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea
          style={{
            labels: {
              fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black")
            }
          }}
          labels={({ datum }) => datum.x}
          data={[{ x: "Cat", y: 62 }, { x: "Dog", y: 91 }, { x: "Fish", y: 55 }, { x: "Bird", y: 55 }]}
        />
      </VictoryChart>
    </div>
  );
}

export const Stacked = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
}
 export const TimeScale = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryArea data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
      </VictoryChart>
      <VictoryChart  horizontal {...defaultChartProps}>
        <VictoryArea data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()} />
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
    </div>
  );
 }

 export const LogScale = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryArea data={getLogData(7)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryArea data={getLogData(7)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} scale={{ y: "log" }}>
        <VictoryArea data={getLogData(7)} />
      </VictoryChart>
    </div>
  );
 }

export const Polar = () => {
  return (
    <div style={containerStyle}>
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
            { x: "Frog", y: 75 }
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
            { x: "Frog", y: 75 }
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
    </div>
  );
}
