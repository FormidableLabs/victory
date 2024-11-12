import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Labels: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={8}>
        <VictoryBar
          {...props}
          data={getData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={8}>
        <VictoryBar
          {...props}
          data={getData(7)}
          labels={["", "", "three", "four", "5", "six"]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={10}>
        <VictoryBar
          {...props}
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: -2, label: "bird" },
            { x: 5, y: -5, label: "cat" },
          ]}
        />
      </VictoryChart>
      <VictoryChart
        polar
        theme={VictoryTheme[props.themeKey]}
        domainPadding={{ y: 20 }}
      >
        <VictoryBar
          {...props}
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: 2, label: "bird" },
            { x: 5, y: 5, label: "cat" },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  ),
};

export default meta;
