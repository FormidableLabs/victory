import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryScatter,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getTimeData } from "../../utils/data";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const TimeScale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getTimeData(5)}
          labels={({ datum }) => datum.x.getFullYear()}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryScatter {...props} data={getTimeData(5)} />
          <VictoryScatter {...props} data={getTimeData(5, "seed-1")} />
          <VictoryScatter {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryScatter {...props} data={getTimeData(5)} />
          <VictoryScatter {...props} data={getTimeData(5, "seed-1")} />
          <VictoryScatter {...props} data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
