import React from "react";
import type { Meta } from "@storybook/react";

import {
  InterpolationPropType,
  VictoryArea,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const Interpolation: Story = {
  args: {
    data: getData(8),
  },
  render: (props) => (
    <>
      {[
        "basis",
        "cardinal",
        "catmullRom",
        "linear",
        "monotoneX",
        "monotoneY",
        "natural",
        "step",
        "stepAfter",
        "stepBefore",
      ].map((interpolation) => (
        <VictoryChart theme={VictoryTheme[props.themeKey]} key={interpolation}>
          <VictoryLabel
            x={175}
            y={30}
            style={{ textAnchor: "middle" }}
            text={interpolation}
          />
          <VictoryArea
            {...props}
            interpolation={interpolation as InterpolationPropType}
          />
        </VictoryChart>
      ))}
    </>
  ),
};

export default meta;
