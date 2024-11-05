import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryLine,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getTimeData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const TimeScale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryLine {...props} data={getTimeData(5)} />
          <VictoryLine {...props} data={getTimeData(5, "seed-1")} />
          <VictoryLine {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryLine {...props} data={getTimeData(5)} />
          <VictoryLine {...props} data={getTimeData(5, "seed-1")} />
          <VictoryLine {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
