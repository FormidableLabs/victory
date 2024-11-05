import React from "react";
import type { Meta } from "@storybook/react";

import { Bar, VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const DisableInlineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} disableInlineStyles  />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props}
          data={data}
          dataComponent={<Bar disableInlineStyles className="fill-purple" />}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
