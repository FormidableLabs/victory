import React from "react";
import { VictoryAxis, VictoryChart } from "victory";

import { ExampleConfig } from "./example";

export const AxisExamples: ExampleConfig[] = [
  {
    title: "VictoryAxis",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryAxis label="X Axis" {...props} />
        <VictoryAxis dependentAxis label="Y Axis" {...props} />
      </VictoryChart>
    ),
  },
];
