import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBoxPlot, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getBoxPlotData } from "../../utils/data";

const meta: Meta<typeof VictoryBoxPlot> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBoxPlot",
};

export const Labels: Story = {
  args: {
    data: getBoxPlotData(3),
    domainPadding: 20,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot labels {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBoxPlot labels {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot minLabels maxLabels medianLabels {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot q1Labels q3Labels {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot
          minLabels={({ datum }) => `min: ${datum.min}`}
          maxLabels={({ datum }) => `max: ${datum.max}`}
          medianLabels={({ datum }) => `med: ${datum.median}`}
          {...props}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot
          q1Labels={({ datum }) => `q1: ${datum.q1}`}
          q3Labels={({ datum }) => `q3: ${datum.q3}`}
          {...props}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot
          labels
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
          labels
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
