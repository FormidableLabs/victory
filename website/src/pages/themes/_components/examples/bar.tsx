import React from "react";
import { VictoryBar, VictoryAxis, VictoryChart } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const BarExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.BAR,
    title: "VictoryBar",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryAxis label="X Axis" />
        <VictoryAxis dependentAxis label="Y Axis" />
        <VictoryBar
          {...props}
          data={[
            {
              x: 1,
              y: 2,
            },
            {
              x: 2,
              y: 3,
            },
            {
              x: 3,
              y: 5,
            },
            {
              x: 4,
              y: 4,
            },
            {
              x: 5,
              y: 7,
            },
          ]}
        />
      </VictoryChart>
    ),
  },
];
