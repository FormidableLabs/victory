/* eslint-disable no-magic-numbers */
import React from "react";
import { VictoryErrorBar } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const ErrorBarExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.ERROR_BAR,
    title: "VictoryErrorBar",
    content: (props) => (
      <VictoryErrorBar
        {...props}
        data={[
          { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
          { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
          { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
          { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
          { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 },
        ]}
      />
    ),
  },
];
