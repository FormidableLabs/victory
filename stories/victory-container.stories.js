/* eslint-disable no-magic-numbers*/
/* eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryLine } from "victory-line";
import { VictoryLabel, VictoryContainer } from "victory-core";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "45%" },
};

const responsiveStyle = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "30%" },
};

export default {
  title: "VictoryContainer",
  component: VictoryContainer,
};

export const PreserveAspectRatio = () => {
  return (
    <div style={{ ...containerStyle, height: "400px" }}>
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
    <div style={{ ...containerStyle }}>
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
    </div>
  );
};
