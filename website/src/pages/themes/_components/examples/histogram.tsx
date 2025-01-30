import React from "react";
import { VictoryHistogram } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const HistogramExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.HISTOGRAM,
    title: "VictoryHistogram",
    content: (props) => (
      <VictoryHistogram
        {...props}
        data={[
          { x: 0 },
          { x: 1 },
          { x: 1 },
          { x: 1 },
          { x: 1 },
          { x: 2 },
          { x: 2 },
          { x: 3 },
          { x: 4 },
          { x: 7 },
          { x: 7 },
          { x: 10 },
        ]}
        labels={({ datum }) => `Bin count:\n ${datum.x}`}
      />
    ),
  },
];
