import React from "react";
import type { Meta } from "@storybook/react";

import {
  Box,
  LineSegment,
  VictoryBoxPlot,
  VictoryChart,
  VictoryTheme,
  Whisker,
} from "@/victory";

import { getBoxPlotData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const DisableInlineStyles: Story = {
  args: {
    domainPadding: 20,
    data: getBoxPlotData(8),
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot disableInlineStyles {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot
          q1Component={<Box disableInlineStyles className="fill-purple" />}
          q3Component={<Box disableInlineStyles className="fill-purple" />}
          maxComponent={
            <Whisker disableInlineStyles className="stroke-green" />
          }
          minComponent={
            <Whisker disableInlineStyles className="stroke-green" />
          }
          medianComponent={
            <LineSegment disableInlineStyles className="stroke-green" />
          }
          {...props}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
