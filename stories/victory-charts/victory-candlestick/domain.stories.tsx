import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryCandlestick, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

export const Domain: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryCandlestick
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={{ x: [2, 5], y: [50, 150] }}
        domainPadding={25}
        data={[
          { x: 1, open: 9, close: 30, high: 56, low: 7 },
          { x: 2, open: 80, close: 40, high: 120, low: 10 },
          { x: 3, open: 50, close: 80, high: 90, low: 20 },
          { x: 4, open: 70, close: 22, high: 70, low: 5 },
          { x: 5, open: 20, close: 35, high: 50, low: 10 },
        ]}
      />
      <VictoryChart
        domain={{ x: [2, 5], y: [50, 150] }}
        domainPadding={25}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryCandlestick
          {...props}
          data={[
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ]}
        />
      </VictoryChart>
      <VictoryChart
        domainPadding={25}
        minDomain={{ y: 70 }}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryCandlestick
          {...props}
          data={[
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ]}
        />
      </VictoryChart>
      <VictoryChart
        domainPadding={25}
        maxDomain={{ x: 4 }}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryCandlestick
          {...props}
          data={[
            { x: 1, open: 9, close: 30, high: 56, low: 7 },
            { x: 2, open: 80, close: 40, high: 120, low: 10 },
            { x: 3, open: 50, close: 80, high: 90, low: 20 },
            { x: 4, open: 70, close: 22, high: 70, low: 5 },
            { x: 5, open: 20, close: 35, high: 50, low: 10 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
