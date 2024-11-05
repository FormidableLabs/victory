import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLine, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryLine {...props} theme={VictoryTheme[props.themeKey]} />
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
