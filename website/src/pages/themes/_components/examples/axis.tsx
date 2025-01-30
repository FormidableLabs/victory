import React from "react";
import { VictoryAxis, VictoryChart } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const AxisExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.AXIS,
    title: "VictoryAxis",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryAxis label="X Axis" {...props} />
        <VictoryAxis dependentAxis label="Y Axis" {...props} />
      </VictoryChart>
    ),
  },
];
