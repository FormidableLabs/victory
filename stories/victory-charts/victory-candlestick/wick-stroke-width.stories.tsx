import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryCandlestick, VictoryChart, VictoryTheme } from "@/victory";

import { getCandlestickData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

export const WickStrokeWidth: Story = {
  args: {
    data: getCandlestickData(7),
  },
  render: (props) => (
    <>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick {...props} wickStrokeWidth={5} />
      </VictoryChart>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          style={{
            data: { stroke: "tomato", strokeWidth: 5 },
          }}
          wickStrokeWidth={2}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
