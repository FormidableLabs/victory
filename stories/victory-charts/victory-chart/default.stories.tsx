import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]} />
    </>
  ),
};

export default meta;
