import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const CornerRadius: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} cornerRadius={1} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} cornerRadius={1} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={data} cornerRadius={10} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props} data={data} cornerRadius={10} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram
          {...props}
          data={data}
          cornerRadius={{ topLeft: 15, bottomRight: 30 }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram
          {...props}
          data={data}
          cornerRadius={{ topLeft: 15, bottomRight: 22 }}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
