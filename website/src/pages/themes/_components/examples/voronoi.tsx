import React from "react";
import { VictoryVoronoi } from "victory";

import { ExampleConfig } from "./example";

export const VoronoiExamples: ExampleConfig[] = [
  {
    title: "VictoryVoronoi",
    content: (props) => (
      <VictoryVoronoi
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
