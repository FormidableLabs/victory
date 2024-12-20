import React from "react";
import { VictoryChart, VictoryPolarAxis } from "victory";

import { ExampleConfig } from "./example";

export const PolarAxisExamples: ExampleConfig[] = [
  {
    title: "VictoryPolarAxis",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryPolarAxis {...props} standalone={false} />
      </VictoryChart>
    ),
  },
];
