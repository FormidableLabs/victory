import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const BinSpacing: Story = {
  args: {
    data,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} binSpacing={10} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} binSpacing={10} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} binSpacing={5} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} binSpacing={5} />
      </VictoryChart>
    </>
  ),
};

export default meta;
