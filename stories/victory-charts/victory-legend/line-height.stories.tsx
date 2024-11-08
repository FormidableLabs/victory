import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryAxis,
  VictoryLegend,
  VictoryChart,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLegend> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLegend",
};

export const LineHeight: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          orientation="vertical"
          rowGutter={0}
          style={{
            labels: { lineHeight: 0.275 },
          }}
          data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          orientation="vertical"
          rowGutter={0}
          style={{
            labels: { lineHeight: 0.75 },
          }}
          data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
