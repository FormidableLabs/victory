/* eslint-disable react/no-multi-comp */
import React from "react";
import { CanvasGroup, CanvasCurve } from "victory-canvas";
import { VictoryChart } from "victory-chart";
import { VictoryTheme, VictoryLabel } from "victory-core";
import { VictoryLine } from "victory-line";
import { VictoryStack } from "victory-stack";
import { getData, getMixedData } from "./data";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

const defaultChartProps = {
  style: parentStyle,
  theme: VictoryTheme.material,
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryLine
        dataComponent={<CanvasCurve />}
        groupComponent={<CanvasGroup />}
        style={parentStyle}
      />
      <VictoryChart style={parentStyle}>
        <VictoryLine
          dataComponent={<CanvasCurve />}
          groupComponent={<CanvasGroup />}
        />
      </VictoryChart>
      <VictoryLine
        dataComponent={<CanvasCurve />}
        groupComponent={<CanvasGroup />}
        style={parentStyle}
        theme={VictoryTheme.material}
      />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine
          dataComponent={<CanvasCurve />}
          groupComponent={<CanvasGroup />}
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
          dataComponent={<CanvasCurve />}
          groupComponent={<CanvasGroup />}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8)}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8, "seed-1")}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8, "seed-2")}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8, "seed-3")}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8, "seed-4")}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryLine
          dataComponent={<CanvasCurve />}
          groupComponent={<CanvasGroup />}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8)}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8, "seed-1")}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8, "seed-2")}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
            data={getData(8, "seed-3")}
          />
          <VictoryLine
            dataComponent={<CanvasCurve />}
            groupComponent={<CanvasGroup />}
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
        dataComponent={<CanvasCurve />}
        groupComponent={<CanvasGroup />}
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
        "stepBefore",
      ].map((interpolation) => makeInterpolationChart(interpolation))}
    </div>
  );
};

export default {
  title: "Victory Canvas/Line",
  component: VictoryLine,
};
