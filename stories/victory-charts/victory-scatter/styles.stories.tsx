import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryScatter, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const Styles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          data={getData(7)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { fill: "tomato" },
          }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          {...props}
          style={{
            data: {
              fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black"),
            },
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
