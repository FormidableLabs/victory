import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryBrushLine } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const BrushAxisGridLine: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryAxis
        {...props}
        label="Label"
        gridComponent={<VictoryBrushLine />}
      />
    </>
  ),
};

export default meta;
