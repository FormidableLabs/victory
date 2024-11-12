import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryLine,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const Stacked: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(7)} />
          <VictoryLine {...props} data={getData(7, "seed-1")} />
          <VictoryLine {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(9)} />
          <VictoryLine {...props} data={getData(5, "seed-1")} />
          <VictoryLine {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(7)} />
          <VictoryLine {...props} data={getData(7, "seed-1")} />
          <VictoryLine {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(9)} />
          <VictoryLine {...props} data={getData(5, "seed-1")} />
          <VictoryLine {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        domainPadding={{ y: 20 }}
        polar
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(7)} />
          <VictoryLine {...props} data={getData(7, "seed-1")} />
          <VictoryLine {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        domainPadding={{ y: 20 }}
        polar
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(9)} />
          <VictoryLine {...props} data={getData(5, "seed-1")} />
          <VictoryLine {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
