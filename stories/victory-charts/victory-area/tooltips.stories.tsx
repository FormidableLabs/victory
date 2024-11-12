import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryArea,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData, getMixedData } from "../../utils/data";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const Tooltips: Story = {
  args: {
    labelComponent: <VictoryTooltip active />,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          data={getData(5)}
          labels={["one", "two", "3", "wow, four tooltips", "five"]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
