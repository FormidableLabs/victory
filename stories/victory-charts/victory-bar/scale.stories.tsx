import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getLogData, getTimeData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Scale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        scale={{ y: "log" }}
        minDomain={1}
      >
        <VictoryBar
          {...props}
          data={getLogData(7)}
          labels={({ datum }) => datum.y.toPrecision(1)}
        />
      </VictoryChart>
      <VictoryChart
        horizontal
        theme={VictoryTheme[props.themeKey]}
        scale={{ y: "log" }}
        minDomain={1}
      >
        <VictoryBar
          {...props}
          data={getLogData(7)}
          labels={({ datum }) => datum.y.toPrecision(1)}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar {...props} data={getTimeData(5)} />
          <VictoryBar {...props} data={getTimeData(5, "seed-1")} />
          <VictoryBar {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar {...props} data={getTimeData(5)} />
          <VictoryBar {...props} data={getTimeData(5, "seed-1")} />
          <VictoryBar {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup offset={10} labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar {...props} data={getTimeData(5)} />
          <VictoryBar {...props} data={getTimeData(5, "seed-1")} />
          <VictoryBar {...props} data={getTimeData(5, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup offset={10} labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar {...props} data={getTimeData(5)} />
          <VictoryBar {...props} data={getTimeData(5, "seed-1")} />
          <VictoryBar {...props} data={getTimeData(5, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
    </>
  ),
};

export default meta;
