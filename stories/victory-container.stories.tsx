import React from "react";
import { VictoryChart } from "../packages/victory-chart";
import { VictoryLine } from "../packages/victory-line";
import { VictoryLabel, VictoryContainer } from "../packages/victory-core";
import { Meta } from "@storybook/react";
import { storyContainer } from "./decorators";

const meta: Meta = {
  title: "Victory Charts/SVG Container/VictoryContainer",
  component: VictoryContainer,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "45%" },
};

const responsiveStyle = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "30%" },
};

export const PreserveAspectRatio = () => {
  return (
    <div style={{ height: "400px" }}>
      <VictoryChart style={style}>
        <VictoryLine />
        <VictoryLabel x={50} y={20} text="default (undefined)" />
      </VictoryChart>
      <VictoryChart
        style={style}
        containerComponent={<VictoryContainer preserveAspectRatio="none" />}
      >
        <VictoryLine />
        <VictoryLabel x={50} y={20} text={`preserveAspectRatio="none"`} />
      </VictoryChart>
      <VictoryChart
        style={style}
        containerComponent={
          <VictoryContainer preserveAspectRatio="xMinYMin meet" />
        }
      >
        <VictoryLine />
        <VictoryLabel
          x={50}
          y={20}
          text={`preserveAspectRatio="xMinYMin meet"`}
        />
      </VictoryChart>
      <VictoryChart
        style={style}
        containerComponent={
          <VictoryContainer preserveAspectRatio="xMinYMin slice" />
        }
      >
        <VictoryLine />
        <VictoryLabel
          x={50}
          y={20}
          text={`preserveAspectRatio="xMinYMin slice"`}
        />
      </VictoryChart>
    </div>
  );
};

export const Responsive = () => {
  return (
    <>
      <VictoryChart style={responsiveStyle}>
        <VictoryLine />
        <VictoryLabel x={50} y={20} text="default responsive={true}" />
      </VictoryChart>
      <VictoryChart
        style={responsiveStyle}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryLine />
        <VictoryLabel x={50} y={20} text={`responsive={false}`} />
      </VictoryChart>
    </>
  );
};
