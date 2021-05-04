/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryErrorBar } from "../packages/victory-errorbar/src/index";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";
import { range } from "lodash";
import seedrandom from "seedrandom";
import { fromJS } from "immutable";

const getData = (num, symmetric, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 3;
  return range(num).map((v) => {
    return {
      x: v + 3,
      y: baseSeed.quick() * 20 + 5,
      errorX: symmetric ? rand() : [rand(), rand()],
      errorY: symmetric ? rand() : [rand(), rand()]
    };
  });
};

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

export default {
  title: "VictoryErrorBar",
  component: VictoryErrorBar
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryErrorBar style={parentStyle} />
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar data={getData(4)} />
      </VictoryChart>
      <VictoryErrorBar style={parentStyle} theme={VictoryTheme.material} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryErrorBar data={getData(4)} />
      </VictoryChart>
    </div>
  );
};

export const BorderWidth = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar data={getData(5)} borderWidth={0} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar data={getData(5)} borderWidth={10} />
      </VictoryChart>
    </div>
  );
};

export const Data = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          data={[
            { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
            { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
            { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
            { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
            { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 }
          ]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          data={[
            { series: 1, value: 9, error: 3 },
            { series: 2, value: 80, error: 4 },
            { series: 3, value: 50, error: 8 },
            { series: 4, value: 70, error: 2 },
            { series: 5, value: 20, error: 3 }
          ]}
          x="series"
          y="value"
          errorY={(d) => [d.error, d.error + 2]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryErrorBar
          data={[
            { series: 1, value: 9, error: 3 },
            { series: 2, value: 80, error: 4 },
            { series: 3, value: 50, error: 8 },
            { series: 4, value: 70, error: 2 },
            { series: 5, value: 20, error: 3 }
          ]}
          x="series"
          y="value"
          errorY={(d) => [d.error, d.error + 2]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          data={fromJS([
            { x: 1, y: 9, error: 3 },
            { x: 2, y: 80, error: 4 },
            { x: 3, y: 50, error: 8 },
            { x: 4, y: 70, error: 2 },
            { x: 5, y: 20, error: 3 }
          ])}
          errorY={(d) => [d.error, d.error + 2]}
        />
      </VictoryChart>
    </div>
  );
};

export const Labels = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryErrorBar data={getData(5)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryErrorBar
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3, label: "first" },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2, label: "third" },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2, label: ["last", "label"] }
          ]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3, label: "first" },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2, label: "third" },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2, label: ["last", "label"] }
          ]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          data={fromJS([
            { x: 1, y: 9, error: 3 },
            { x: 2, y: 80, error: 4 },
            { x: 3, y: 50, error: 8 },
            { x: 4, y: 70, error: 2 },
            { x: 5, y: 20, error: 3 }
          ])}
          errorY={(d) => [d.error, d.error + 2]}
        />
      </VictoryChart>
    </div>
  );
};

export const Style = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          data={getData(4)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
          }}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryErrorBar
          style={{
            labels: {
              fill: ({ datum }) => (datum.errorX > datum.errorY ? "red" : "black")
            },
            data: {
              stroke: ({ datum }) => (datum.errorX > datum.errorY ? "red" : "black")
            }
          }}
          labels={({ datum }) => datum.x}
          data={getData(4, "symmetric")}
        />
      </VictoryChart>
    </div>
  );
};

export const Domain = () => {
  return (
    <div style={containerStyle}>
      <VictoryErrorBar
        style={parentStyle}
        domain={{ x: [2, 5], y: [25, 100] }}
        data={[
          { x: 1, y: 9, errorX: 0.3, errorY: 3 },
          { x: 2, y: 80, errorX: 0.5, errorY: 2 },
          { x: 3, y: 50, errorX: 1.1, errorY: 2 },
          { x: 4, y: 70, errorX: 0.2, errorY: 3 },
          { x: 5, y: 20, errorX: 0.3, errorY: 2 }
        ]}
      />
      <VictoryChart style={parentStyle} domain={{ x: [2, 5], y: [25, 100] }}>
        <VictoryErrorBar
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3 },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2 },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2 }
          ]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} minDomain={{ x: 3 }}>
        <VictoryErrorBar
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3 },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2 },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2 }
          ]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} maxDomain={{ y: 65 }}>
        <VictoryErrorBar
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3 },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2 },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2 }
          ]}
        />
      </VictoryChart>
    </div>
  );
};
