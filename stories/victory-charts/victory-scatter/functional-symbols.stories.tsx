import React from "react";
import type { Meta } from "@storybook/react";

import {
  ScatterSymbolType,
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
} from "@/victory";

import { getData, getMixedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

const SYMBOLS: ScatterSymbolType[] = [
  "circle",
  "cross",
  "diamond",
  "plus",
  "minus",
  "square",
  "star",
  "triangleDown",
  "triangleUp",
];

export const FunctionalSymbols: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getMixedData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryScatter
          {...props}
          data={getMixedData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={[
            { x: 1, y: 45, symbol: "star" },
            { x: 2, y: 85 },
            { x: 3, y: 55, symbol: "square" },
            { x: 4, y: 15 },
          ]}
          symbol="plus"
          size={8}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar innerRadius={30}>
        <VictoryScatter
          {...props}
          data={getData(8)}
          symbol={({ index }) => SYMBOLS[index]}
          labels={({ index }) => SYMBOLS[index]}
          size={8}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
