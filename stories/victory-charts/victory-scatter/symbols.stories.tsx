import React from "react";
import type { Meta } from "@storybook/react";

import {
  ScatterSymbolType,
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
} from "@/victory";

import { getMixedData } from "../../utils/data";
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

export const Symbols: Story = {
  args: {},
  render: (props) => {
    return (
      <>
        {SYMBOLS.map((symbol) => (
          <div key={symbol}>
            <VictoryChart theme={VictoryTheme[props.themeKey]}>
              <VictoryScatter
                {...props}
                data={getMixedData(8)}
                symbol={symbol}
                size={10}
                labels={() => symbol}
              />
            </VictoryChart>
            <VictoryChart theme={VictoryTheme[props.themeKey]} polar>
              <VictoryScatter
                {...props}
                data={getMixedData(8)}
                symbol={symbol}
                size={10}
                labels={() => symbol}
              />
            </VictoryChart>
          </div>
        ))}
      </>
    );
  },
};

export default meta;
