import React from "react";
import type { Meta } from "@storybook/react";

import { Curve, VictoryLine, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const DisableInlineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine {...props} disableInlineStyles />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          dataComponent={<Curve disableInlineStyles className="stroke-green" />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
