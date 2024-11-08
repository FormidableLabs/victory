import React from "react";
import type { Meta } from "@storybook/react";

import { Candle, VictoryCandlestick, VictoryChart } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getCandlestickData } from "../../utils/data";

const meta: Meta<typeof VictoryCandlestick> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryCandlestick",
};

export const DisableInlineStyles: Story = {
  args: {
    data: getCandlestickData(8),
  },
  render: (props) => (
    <>
      <VictoryChart>
        <VictoryCandlestick {...props} disableInlineStyles />
      </VictoryChart>
      <VictoryChart>
        <VictoryCandlestick
          {...props}
          dataComponent={
            <Candle disableInlineStyles className="fill-green stroke-purple" />
          }
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
