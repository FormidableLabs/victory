import React from "react";
import type { Meta } from "../../utils/types";

import { VictoryLabel, VictoryScatter } from "victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel {...props} />}
      />
    </>
  ),
};

export default meta;
