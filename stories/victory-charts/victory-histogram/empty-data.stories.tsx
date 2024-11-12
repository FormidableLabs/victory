import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const EmptyData: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={[]} bins={2} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props} data={[]} bins={[0, 30, 100, 150]} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram
          {...props}
          scale={{ x: "time" }}
          data={[]}
          bins={[
            new Date(2015, 0, 1),
            new Date(2020, 0, 1),
            new Date(2025, 0, 1),
          ]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram
          {...props}
          scale={{ x: "time" }}
          data={[]}
          bins={[
            new Date(2015, 0, 1),
            new Date(2020, 0, 1),
            new Date(2025, 0, 1),
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
