import React from "react";
import type { Meta } from "@storybook/react";

import { Point, VictoryScatter, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const DisableInlineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter {...props} disableInlineStyles />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          dataComponent={<Point disableInlineStyles className="fill-green" />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
