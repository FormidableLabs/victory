import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryChart, VictoryTheme } from "@/victory";

import { getValues } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const TickFormat: Story = {
  args: {
    tickValues: getValues(5),
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis
          {...props}
          tickFormat={["one", "two", "three", "four", "five"]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} tickFormat={(t) => `#${t}`} />
      </VictoryChart>
    </>
  ),
};

export default meta;
