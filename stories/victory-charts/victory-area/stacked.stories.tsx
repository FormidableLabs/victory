import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryArea,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData, getDataWithBaseline } from "../../utils/data";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const Stacked: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(7)} />
          <VictoryArea {...props} data={getData(7, "seed-1")} />
          <VictoryArea {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(9)} />
          <VictoryArea {...props} data={getData(5, "seed-1")} />
          <VictoryArea {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(7)} />
          <VictoryArea {...props} data={getData(7, "seed-1")} />
          <VictoryArea {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(9)} />
          <VictoryArea {...props} data={getData(5, "seed-1")} />
          <VictoryArea {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        domainPadding={{ y: 20 }}
        polar
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(7)} />
          <VictoryArea {...props} data={getData(7, "seed-1")} />
          <VictoryArea {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        domainPadding={{ y: 20 }}
        polar
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryStack colorScale="qualitative" labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(9)} />
          <VictoryArea {...props} data={getData(5, "seed-1")} />
          <VictoryArea {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack>
          <VictoryArea {...props} data={getDataWithBaseline(5)} />
          <VictoryArea {...props} data={getData(5, "seed-1")} />
          <VictoryArea {...props} data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
