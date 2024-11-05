import React from "react";
import type { Meta } from "@storybook/react";

import { Bar, VictoryBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const DisableInlineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} disableInlineStyles />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          dataComponent={<Bar disableInlineStyles className="fill-purple" />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
