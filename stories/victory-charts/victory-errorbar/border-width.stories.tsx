import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryErrorBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getErrorBarData } from "../../utils/data";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorBar",
};

export const BorderWidth: Story = {
  args: {
    data: getErrorBarData(5),
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar {...props} borderWidth={0} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar {...props} borderWidth={10} />
      </VictoryChart>
    </>
  ),
};

export default meta;
