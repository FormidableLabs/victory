import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLine, VictoryChart, VictoryTheme } from "@/victory";

import { getLogData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const LogScale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} scale={{ y: "log" }}>
        <VictoryLine
          {...props}
          data={getLogData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart
        horizontal
        theme={VictoryTheme[props.themeKey]}
        scale={{ y: "log" }}
      >
        <VictoryLine
          {...props}
          data={getLogData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart
        polar
        theme={VictoryTheme[props.themeKey]}
        scale={{ y: "log" }}
      >
        <VictoryLine {...props} data={getLogData(7)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
