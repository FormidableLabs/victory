import React from "react";

import { VictoryChart } from "../packages/victory-chart";
import { VictoryPolarAxis } from "../packages/victory-polar-axis";
import { VictoryTheme } from "../packages/victory-core";

export const getChartDecorator = (props) => {
  return (story) => {
    return <VictoryChart {...props}>{story()}</VictoryChart>;
  };
};

export const getPolarChartDecorator = (props) => {
  return (story) => {
    return (
      <VictoryChart polar theme={VictoryTheme.material} {...props}>
        {story()}
        <VictoryPolarAxis />
      </VictoryChart>
    );
  };
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

export const storyContainer = (story) => (
  <div style={containerStyle}>{story()}</div>
);
