/* eslint-disable react/no-multi-comp */
/* eslint-disable no-magic-numbers */
import * as React from "react";
import { VictoryLine } from "./victory-line";
import VictoryChart from "victory-chart/es/v37/victory-chart";
import { getData } from "../../../../stories/data";

export default {
  title: "v37/VictoryLine",
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  component: VictoryLine,
};

export const Demo = (props) => {
  return <VictoryLine {...props} data={getData(8)} />;
};

Demo.args = {
  lineRatio: 0.5,
};

export const WithChart = (props) => {
  return (
    <VictoryChart {...props}>
      <VictoryLine />
    </VictoryChart>
  );
};
