import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryArea, VictoryChart, VictoryTheme } from "@/victory";

import { getLogData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const LogScale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} scale={{ y: "log" }}>
        <VictoryArea
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
        <VictoryArea
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
        <VictoryArea {...props} data={getLogData(7)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
