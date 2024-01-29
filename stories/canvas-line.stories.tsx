import React from "react";
import { Meta } from "@storybook/react";

import { CanvasGroup, CanvasCurve } from "../packages/victory-canvas";
import { VictoryChart } from "../packages/victory-chart";
import { VictoryTheme, VictoryLabel } from "../packages/victory-core";
import { VictoryLine } from "../packages/victory-line";
import { VictoryStack } from "../packages/victory-stack";
import { getData, getMixedData } from "./data";
import { storyContainer } from "./decorators";

const meta: Meta<typeof VictoryLine> = {
  title: "Victory Charts/Canvas Container/VictoryLine",
  component: VictoryLine,
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
    </>
  );
};

export const Theme = () => {
  return (
    <>
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
      <VictoryLine
        dataComponent={<CanvasCurve />}
        groupComponent={<CanvasGroup />}
        data={getData(8)}
        interpolation={interpolation}
      />
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
