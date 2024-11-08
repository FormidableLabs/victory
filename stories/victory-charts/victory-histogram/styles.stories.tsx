import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const Styles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryHistogram {...props}
          data={data}
          style={{
            data: { transform: "translate(0px, -20px) skew(2deg, 2deg)" },
          }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryHistogram {...props}
          data={data}
          style={{
            data: {
              stroke: ({ datum }) => (datum.y > 3 ? "red" : "transparent"),
              strokeWidth: 3,
              opacity: ({ datum }) => (datum.y > 3 ? 1 : 0.4),
            },
          }}
          labels={["one", "two", "three", "four", "five"]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
