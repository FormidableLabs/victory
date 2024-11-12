import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryScatter,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const Stacked: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(7)} />
          <VictoryScatter {...props} data={getData(7, "seed-1")} />
          <VictoryScatter {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(9)} />
          <VictoryScatter {...props} data={getData(5, "seed-1")} />
          <VictoryScatter {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(7)} />
          <VictoryScatter {...props} data={getData(7, "seed-1")} />
          <VictoryScatter {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(9)} />
          <VictoryScatter {...props} data={getData(5, "seed-1")} />
          <VictoryScatter {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        domainPadding={{ y: 20 }}
        polar
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(7)} />
          <VictoryScatter {...props} data={getData(7, "seed-1")} />
          <VictoryScatter {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        domainPadding={{ y: 20 }}
        polar
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(9)} />
          <VictoryScatter {...props} data={getData(5, "seed-1")} />
          <VictoryScatter {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
