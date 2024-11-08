import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryBrushLine } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const BrushAxisGridLineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryAxis
        {...props}
        label="Label"
        gridComponent={
          <VictoryBrushLine
            brushDomain={[0.25, 0.5]}
            brushAreaStyle={{
              fill: "orange",
              stroke: "tomato",
              strokeWidth: 2,
            }}
            brushStyle={{ fill: "teal", stroke: "navy", strokeWidth: 2 }}
            handleStyle={{ strokeWidth: 1, stroke: "grey" }}
          />
        }
      />
    </>
  ),
};

export default meta;
