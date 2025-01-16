/* eslint-disable no-magic-numbers */

import React from "react";
import { VictoryBoxPlot } from "victory";

import { ExampleConfig } from "./example";

export const BoxPlotExamples: ExampleConfig[] = [
  {
    title: "VictoryBoxPlot",
    content: (props) => (
      <VictoryBoxPlot
        {...props}
        data={[
          { x: 1, y: [1, 2, 3, 5, 8] },
          { x: 2, y: [3, 2, 8, 10, 12] },
          { x: 3, y: [2, 8, 6, 5, 10] },
          { x: 4, y: [1, 3, 2, 9, 5] },
          { x: 5, y: [3, 2, 9, 5, 7] },
        ]}
        labels
        labelOrientation="right"
      />
    ),
  },
];
