import React from "react";
import type { Meta } from "@storybook/react";

import {
  ErrorBar,
  VictoryErrorBar,
  VictoryChart,
  VictoryTheme,
} from "@/victory";

import { getErrorBarData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorbar",
};

export const DisableInlineStyles: Story = {
  args: {
    data: getErrorBarData(4),
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryErrorBar
          {...props}
          dataComponent={
            <ErrorBar disableInlineStyles className="stroke-purple" />
          }
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
