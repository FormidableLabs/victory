import * as React from "react";
import VictoryBar from "./victory-bar-beta";

export default {
  title: "VictoryBar",
  component: VictoryBar
};

export const Demo = (props) => {
  return <VictoryBar {...props} />;
};

Demo.args = {
  barRatio: 0.5
};
