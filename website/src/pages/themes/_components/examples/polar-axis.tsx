import React from "react";
import { VictoryChart, VictoryPolarAxis } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const PolarAxisExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.POLAR_AXIS,
    title: "VictoryPolarAxis",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryPolarAxis {...props} standalone={false} />
      </VictoryChart>
    ),
  },
];
