import React from "react";
import { VictoryScatter } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const ScatterExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.SCATTER,
    title: "VictoryScatter",
    content: (props) => (
      <VictoryScatter
        {...props}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
      />
    ),
  },
];
