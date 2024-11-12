import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";

import { getData, getMixedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const Tooltips: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getData(5)}
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
