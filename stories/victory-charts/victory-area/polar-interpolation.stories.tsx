import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryArea,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const PolarInterpolation: Story = {
  args: {
    data: getData(8),
  },
  render: (props) => (
    <>
      {["basis", "cardinal", "catmullRom", "linear"].map((interpolation) => (
        <VictoryChart
          polar
          theme={VictoryTheme[props.themeKey]}
          key={interpolation}
        >
          <VictoryLabel
            x={175}
            y={30}
            style={{ textAnchor: "middle" }}
            text={interpolation}
          />
          <VictoryArea {...props} interpolation={interpolation} />
        </VictoryChart>
      ))}
    </>
  ),
};

export default meta;
