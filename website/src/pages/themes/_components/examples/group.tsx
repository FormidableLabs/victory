import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup } from "victory";

import { ExampleConfig } from "./example";

export const GroupExamples: ExampleConfig[] = [
  {
    title: "VictoryGroup",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryAxis label="X Axis" />
        <VictoryAxis dependentAxis label="Y Axis" />
        <VictoryGroup domainPadding={{ x: 20 }} offset={20}>
          <VictoryBar
            {...props}
            data={[
              { x: "2023 Q1", y: 1 },
              { x: "2023 Q2", y: 2 },
              { x: "2023 Q3", y: 3 },
              { x: "2023 Q4", y: 2 },
            ]}
          />
          <VictoryBar
            {...props}
            data={[
              { x: "2023 Q1", y: 2 },
              { x: "2023 Q2", y: 3 },
              { x: "2023 Q3", y: 4 },
              { x: "2023 Q4", y: 5 },
            ]}
          />
          <VictoryBar
            {...props}
            data={[
              { x: "2023 Q1", y: 1 },
              { x: "2023 Q2", y: 2 },
              { x: "2023 Q3", y: 3 },
              { x: "2023 Q4", y: 4 },
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    ),
  },
];
