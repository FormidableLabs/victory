import React from "react";
import { VictoryCandlestick } from "victory";

import { ExampleConfig } from "./example";

export const CandlestickExamples: ExampleConfig[] = [
  {
    title: "VictoryCandlestick",
    content: (props) => (
      <VictoryCandlestick
        {...props}
        data={[
          {
            x: "3/1/23",
            open: 5,
            close: 10,
            high: 15,
            low: 0,
            label: "A",
          },
          {
            x: "3/2/23",
            open: 10,
            close: 15,
            high: 20,
            low: 5,
            label: "B",
          },
          {
            x: "3/3/23",
            open: 15,
            close: 20,
            high: 22,
            low: 10,
            label: "C",
          },
          {
            x: "3/4/23",
            open: 20,
            close: 10,
            high: 25,
            low: 7,
            label: "D",
          },
          {
            x: "3/5/23",
            open: 10,
            close: 8,
            high: 15,
            low: 5,
            label: "E",
          },
        ]}
      />
    ),
  },
];
