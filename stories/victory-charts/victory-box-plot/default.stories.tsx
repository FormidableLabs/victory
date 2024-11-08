import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBoxPlot, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getBoxPlotData } from "../../utils/data";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const Default: Story = {
  args: {
    domainPadding: 20,
    data: getBoxPlotData(5),
  },
  render: (props) => (
    <VictoryChart theme={VictoryTheme[props.themeKey]}>
      <VictoryBoxPlot {...props} />
    </VictoryChart>
  ),
};

export default meta;
