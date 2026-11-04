import React from "react";
import type { Meta } from "../../utils/types";

import { VictoryErrorBar, VictoryTheme } from "victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorBar",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryErrorBar {...props} theme={VictoryTheme[props.themeKey]} />
    </>
  ),
};

export default meta;
