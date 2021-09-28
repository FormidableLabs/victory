import React from "react";
import { VictoryLine } from "../packages/victory-line/src";
import { Curve, Container } from "../packages/victory-canvas/src";

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
};

export const DefaultRendering = () => {
  return (
    <VictoryLine
      style={parentStyle}
      dataComponent={<Curve />}
      containerComponent={<Container />}
    />
  );
};

export default {
  title: "Victory Canvas/Curve",
  component: Curve
};
