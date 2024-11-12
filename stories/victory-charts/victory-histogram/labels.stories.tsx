import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryHistogram,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const Labels: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram
          {...props}
          data={data}
          bins={5}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram
          {...props}
          data={data}
          bins={5}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram
          {...props}
          data={data}
          bins={5}
          labels={["", "", "three", "four", "5", "six"]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram
          {...props}
          data={data}
          bins={5}
          labels={["", "", "three", "four", "5", "six"]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram
          {...props}
          data={data}
          bins={5}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram
          {...props}
          data={data}
          bins={5}
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
