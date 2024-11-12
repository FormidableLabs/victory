import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLine, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const Styles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          data={getData(7)}
          labels={({ datum }) => datum.x}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { stroke: "tomato", strokeWidth: 2 },
          }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
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
