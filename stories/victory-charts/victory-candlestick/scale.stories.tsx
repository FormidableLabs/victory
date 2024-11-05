import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryCandlestick, VictoryChart, VictoryTheme } from "@/victory";

import { getCandlestickTimeData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

export const Scale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          data={getCandlestickTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart domainPadding={20} theme={VictoryTheme[props.themeKey]}>
        <VictoryCandlestick
          {...props}
          horizontal
          data={getCandlestickTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
