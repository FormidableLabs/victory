import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBoxPlot, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getBoxPlotData } from "../../utils/data";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const Theme: Story = {
  args: {
    domainPadding: 20,
  },
  render: (props) => (
    <>
      <VictoryBoxPlot theme={VictoryTheme.grayscale} />
      <VictoryChart theme={VictoryTheme.grayscale}>
        <VictoryBoxPlot data={getBoxPlotData(8)} {...props} />
      </VictoryChart>
      <VictoryBoxPlot theme={VictoryTheme.material} {...props} />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryBoxPlot data={getBoxPlotData(8)} {...props} />
      </VictoryChart>
      <VictoryBoxPlot theme={VictoryTheme.clean} {...props} />
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryBoxPlot data={getBoxPlotData(8)} {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
