import React from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryStack } from "victory";
import {
  NUM_STACKS,
  sampleStackData,
  VictoryComponentType,
} from "../../_const";

import { ExampleConfig } from "./example";

export const StackExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.STACK,
    title: "VictoryStack",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryAxis label="X Axis" />
        <VictoryAxis dependentAxis label="Y Axis" />
        <VictoryStack
          {...props}
          key="victory-stack"
          colorScale={props.colorScale}
        >
          {[...Array(NUM_STACKS)].map((_, i) => (
            <VictoryArea data={sampleStackData} key={i} />
          ))}
        </VictoryStack>
      </VictoryChart>
    ),
  },
];
