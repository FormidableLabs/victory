/* eslint-disable react/no-multi-comp */
import * as React from "react";
import VictoryBar from "./victory-bar-v3";
import VictoryChart from "victory-chart/es/v37/victory-chart";

export default {
  title: "v37/VictoryBarV3",
  component: VictoryBar,
};

export const Demo = (props) => {
  return (
    <svg>
      <VictoryBar {...props} />{" "}
    </svg>
  );
};

Demo.args = {
  barRatio: 0.5,
};

// NOT WORKING YET:
const WithChart = (props) => {
  return (
    <VictoryChart {...props}>
      <VictoryBar />
    </VictoryChart>
  );
};
