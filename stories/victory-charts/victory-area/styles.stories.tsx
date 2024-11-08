import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryArea,
  VictoryChart,
  VictoryLabelStyleObject,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

const labelStyle: VictoryLabelStyleObject = {
  fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black"),
};

export const Styles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          data={getData(7)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: {
              fill: "tomato",
              fillOpacity: 0.7,
              stroke: "tomato",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
          {...props}
          style={{
            labels: labelStyle,
          }}
          labels={({ datum }) => datum.x}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;