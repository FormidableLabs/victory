import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const NumericBins: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} bins={2} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} bins={2} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} bins={8} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} bins={8} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} bins={48} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} bins={48} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} bins={[0, 30, 50]} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} bins={[0, 30, 50]} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} bins={[0, 30, 50, 100]} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} bins={[0, 30, 50, 100]} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} bins={[0, 10, 30, 70, 150]} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} bins={[0, 10, 30, 70, 150]} />
      </VictoryChart>
    </>
  ),
};

export default meta;
