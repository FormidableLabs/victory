import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryScatter, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getLogData } from "../../utils/data";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const LogScale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} scale={{ y: "log" }}>
        <VictoryScatter
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
        <VictoryScatter
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
        <VictoryScatter {...props} data={getLogData(7)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
