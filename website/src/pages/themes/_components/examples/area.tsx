import React from "react";
import { VictoryArea, VictoryAxis, VictoryChart } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const AreaExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.AREA,
    title: "VictoryArea",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryAxis label="X Axis" />
        <VictoryAxis dependentAxis label="Y Axis" />
        <VictoryArea
          {...props}
          data={[
            { x: 1, y: 2, label: "A" },
            { x: 2, y: 3, label: "B" },
            { x: 3, y: 5, label: "C" },
            { x: 4, y: 4, label: "D" },
            { x: 5, y: 7, label: "E" },
          ]}
        />
      </VictoryChart>
    ),
  },
];
