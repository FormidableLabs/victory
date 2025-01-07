/* eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart, VictoryPolarAxis } from "victory";

import { ExampleConfig } from "./example";

export const PolarAxisDependentExamples: ExampleConfig[] = [
  {
    title: "VictoryPolarAxis - Dependent",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryPolarAxis
          {...props}
          dependentAxis
          domain={[0, 10]}
          standalone={false}
        />
      </VictoryChart>
    ),
  },
];
