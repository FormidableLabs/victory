import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const Theme: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie {...props} />
      <VictoryPie {...props} theme={VictoryTheme.material} />
      <VictoryPie {...props} theme={VictoryTheme.clean} />
    </>
  ),
};

export default meta;
