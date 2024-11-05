import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryArea,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getTimeData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const TimeScale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryArea {...props} data={getTimeData(5)} />
          <VictoryArea {...props} data={getTimeData(5, "seed-1")} />
          <VictoryArea {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryArea {...props} data={getTimeData(5)} />
          <VictoryArea {...props} data={getTimeData(5, "seed-1")} />
          <VictoryArea {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
