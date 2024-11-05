import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBoxPlot, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getArrayData } from "../../utils/data";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const Domain: Story = {
  args: {
    data: getArrayData(5, 10),
    domainPadding: 20,
  },
  render: (props) => (
    <>
      <VictoryBoxPlot domain={{ x: [3, 5.5], y: [0, 10] }} {...props} />
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        domain={{ x: [3, 5.5], y: [0, 10] }}
      >
        <VictoryBoxPlot {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} minDomain={{ y: 2 }}>
        <VictoryBoxPlot {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} maxDomain={{ x: 4 }}>
        <VictoryBoxPlot {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
