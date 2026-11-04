import React from "react";
import type { Meta } from "../../utils/types";

import { VictoryBar, VictoryTheme } from "victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar {...props} theme={VictoryTheme[props.themeKey]} />
    </>
  ),
};

export default meta;
