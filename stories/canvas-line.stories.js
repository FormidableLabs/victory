/* eslint-disable react/no-multi-comp */
import React from "react";
import { CanvasContainer, Curve } from "../packages/victory-canvas/src";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryTheme, VictoryLabel } from "../packages/victory-core/src/index";
import { VictoryLine } from "../packages/victory-line/src";
import { VictoryStack } from "../packages/victory-stack/src/index";
import { getData, getMixedData } from "./data";

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

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryLine
        dataComponent={<Curve />}
        groupComponent={<CanvasContainer />}
        style={parentStyle}
      />
      <VictoryChart style={parentStyle}>
        <VictoryLine
          dataComponent={<Curve />}
          groupComponent={<CanvasContainer />}
        />
      </VictoryChart>
      <VictoryLine
        dataComponent={<Curve />}
        groupComponent={<CanvasContainer />}
        style={parentStyle}
        theme={VictoryTheme.material}
      />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine
          dataComponent={<Curve />}
          groupComponent={<CanvasContainer />}
        />
      </VictoryChart>
    </div>
  );
};

export const Theme = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryLine
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
          dataComponent={<Curve />}
          groupComponent={<CanvasContainer />}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8)}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-1")}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-2")}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-3")}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-4")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine
          dataComponent={<Curve />}
          groupComponent={<CanvasContainer />}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8)}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-1")}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-2")}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-3")}
          />
          <VictoryLine
            dataComponent={<Curve />}
            groupComponent={<CanvasContainer />}
            data={getData(8, "seed-4")}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
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
      <VictoryLine
        dataComponent={<Curve />}
        groupComponent={<CanvasContainer />}
        data={getData(8)}
        interpolation={interpolation}
      />
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

export default {
  title: "Victory Canvas/Line",
  component: VictoryLine
};
