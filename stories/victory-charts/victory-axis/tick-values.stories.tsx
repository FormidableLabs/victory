import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryChart, VictoryTheme } from "@/victory";

import { getRandomValues, getTimeValues, getValues } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const TickValues: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} tickValues={getValues(5)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} dependentAxis tickValues={getValues(5)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} tickValues={getRandomValues(5)} />
        <VictoryAxis {...props} dependentAxis tickValues={getRandomValues(5)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} tickValues={["one", "two", "three", "four"]} />
        <VictoryAxis
          {...props}
          dependentAxis
          tickValues={["one", "two", "three", "four"]}
        />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        horizontal
        scale={{ x: "time" }}
      >
        <VictoryAxis {...props} tickValues={getTimeValues(5)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} scale={{ x: "time" }}>
        <VictoryAxis {...props} tickValues={getTimeValues(5)} />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        horizontal
        scale={{ x: "log" }}
      >
        <VictoryAxis
          {...props}
          tickValues={[1, 3, 5, 7, 10, 50, 100, 500, 1000]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} scale={{ x: "log" }}>
        <VictoryAxis
          {...props}
          tickValues={[1, 3, 5, 7, 10, 50, 100, 500, 1000]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis
          {...props}
          label={"Empty Tick Values"}
          tickValues={[]}
          orientation="right"
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
