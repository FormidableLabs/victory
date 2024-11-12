import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBoxPlot,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";

import { getBoxPlotData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const Tooltips: Story = {
  args: {
    data: getBoxPlotData(3),
    domainPadding: 20,
    labels: true,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot
          minLabelComponent={<VictoryTooltip active />}
          q3LabelComponent={<VictoryTooltip active />}
          labelOrientation={{
            q1: "left",
            q3: "left",
            min: "right",
            max: "right",
            median: "right",
          }}
          {...props}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBoxPlot
          minLabelComponent={<VictoryTooltip active />}
          q3LabelComponent={<VictoryTooltip active />}
          labelOrientation={{
            q1: "top",
            q3: "top",
            min: "bottom",
            max: "bottom",
            median: "bottom",
          }}
          {...props}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
