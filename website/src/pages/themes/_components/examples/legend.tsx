import React from "react";
import { VictoryBar, VictoryChart, VictoryLegend } from "victory";

import { ExampleConfig } from "./example";
import { VictoryComponentType } from "../../_const";

export const LegendExamples: ExampleConfig[] = [
  {
    key: VictoryComponentType.LEGEND,
    title: "VictoryLegend",
    content: (props) => (
      <VictoryChart theme={props.theme} domainPadding={20}>
        <VictoryLegend
          {...props}
          x={125}
          y={20}
          title="Pets"
          data={[
            {
              name: "Dogs",
              symbol: { fill: "tomato" },
            },
            {
              name: "Cats",
              symbol: { fill: "orange" },
            },
            {
              name: "Rabbits",
              symbol: { fill: "gold" },
            },
          ]}
        />
        <VictoryBar
          data={[
            {
              x: "Dogs",
              y: 6,
              fill: "tomato",
            },
            {
              x: "Cats",
              y: 4,
              fill: "orange",
            },
            {
              x: "Rabbits",
              y: 2,
              fill: "gold",
            },
          ]}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
            },
          }}
        />
      </VictoryChart>
    ),
  },
];
