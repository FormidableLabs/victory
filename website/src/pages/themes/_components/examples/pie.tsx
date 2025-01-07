import React from "react";
import { VictoryPie } from "victory";

import { ExampleConfig } from "./example";

export const PieExamples: ExampleConfig[] = [
  {
    title: "VictoryPie",
    content: (props) => (
      <VictoryPie
        {...props}
        data={[
          { x: "Cats", y: 35 },
          { x: "Dogs", y: 40 },
          { x: "Birds", y: 55 },
          { x: "Fishes", y: 15 },
          { x: "Reptiles", y: 10 },
        ]}
      />
    ),
    hasVictoryChart: false,
  },
];
