import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Style: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={10}>
        <VictoryBar
          {...props}
          labels={({ datum }) => datum.y}
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
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={10}>
        <VictoryBar
          {...props}
          style={{
            data: {
              stroke: ({ datum }) => (datum.y > 75 ? "red" : "transparent"),
              strokeWidth: 3,
              opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4),
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
