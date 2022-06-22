/* eslint-disable react/no-multi-comp */
import * as React from "react";
import VictoryBar from "./victory-bar";
import VictoryChart from "victory-chart/lib/v37/victory-chart";

export default {
  title: "v37/VictoryBar",
  component: VictoryBar,
};

export const Demo = (props) => {
  return <VictoryBar {...props} />;
};

Demo.args = {
  barRatio: 0.5,
};

export const WithChart = (props) => {
  return (
    <VictoryChart {...props}>
      <VictoryBar />
    </VictoryChart>
  );
};
