/* eslint-disable react/no-multi-comp */
import * as React from "react";
import VictoryBar from "./victory-bar-v2";
import VictoryChart from "victory-chart/es/v37/victory-chart";

export default {
  title: "v37/VictoryBar",
  parameters: {
    chromatic: { disableSnapshot: true },
  },
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
