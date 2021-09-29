import React from "react";
import { CanvasContainer, Curve } from "../packages/victory-canvas/src";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";
import { VictoryLine } from "../packages/victory-line/src";

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

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryLine
        style={parentStyle}
        dataComponent={<Curve />}
        containerComponent={<CanvasContainer />}
      />
      <VictoryChart
        style={parentStyle}
        containerComponent={<CanvasContainer />}
      >
        <VictoryLine dataComponent={<Curve />} />
      </VictoryChart>
      <VictoryLine
        style={parentStyle}
        dataComponent={<Curve />}
        containerComponent={<CanvasContainer />}
        theme={VictoryTheme.material}
      />
      <VictoryChart
        style={parentStyle}
        containerComponent={<CanvasContainer />}
        theme={VictoryTheme.material}
      >
        <VictoryLine dataComponent={<Curve />} />
      </VictoryChart>
    </div>
  );
};

export default {
  title: "Victory Canvas/Curve",
  component: Curve
};
