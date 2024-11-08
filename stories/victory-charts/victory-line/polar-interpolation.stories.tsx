import React from "react";
import type { Meta } from "@storybook/react";

import {
  InterpolationPropType,
  VictoryLine,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const PolarInterpolation: Story = {
  args: {},
  render: (props) => {
    const makeInterpolationChart = (interpolation) => (
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryLabel
          x={175}
          y={30}
          style={{ textAnchor: "middle" }}
          text={interpolation}
        />
        <VictoryLine
          {...props}
          data={getData(8)}
          interpolation={interpolation as InterpolationPropType}
        />
      </VictoryChart>
    );

    return (
      <>
        {["basis", "cardinal", "catmullRom", "linear"].map((interpolation) =>
          makeInterpolationChart(interpolation),
        )}
      </>
    );
  },
};

export default meta;
