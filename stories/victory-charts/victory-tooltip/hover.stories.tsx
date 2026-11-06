import React from "react";
import type { Meta } from "../../utils/types";

import { VictoryTooltip, VictoryBar } from "victory";
import { defaultBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

// Not `active`: each tooltip shows while its bar is hovered.
export const Hover: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labels={({ datum }) => `y: ${datum.y.toFixed(1)}`}
        labelComponent={<VictoryTooltip {...props} />}
      />
    </>
  ),
};

export default meta;
