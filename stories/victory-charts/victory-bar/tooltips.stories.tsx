import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";

import { getData, getMixedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Tooltips: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={10}>
        <VictoryBar
          {...props}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart
        horizontal
        theme={VictoryTheme[props.themeKey]}
        domainPadding={10}
      >
        <VictoryBar
          {...props}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={10}>
        <VictoryBar
          {...props}
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart
        horizontal
        theme={VictoryTheme[props.themeKey]}
        domainPadding={10}
      >
        <VictoryBar
          {...props}
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={10}>
        <VictoryBar
          {...props}
          data={getData(5)}
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={getData(5)}
          style={{ data: { width: 20 } }}
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  ),
};

export default meta;
