import React from "react";
import type { Meta } from "../../utils/types";

import {
  VictoryBar,
  VictoryPie,
  VictorySharedEvents,
  VictoryTheme,
} from "victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictorySharedEvents> = {
  ...ComponentMeta,
  title: "Victory Charts/VictorySharedEvents",
};

const data = [
  { x: "a", y: 2 },
  { x: "b", y: 3 },
  { x: "c", y: 5 },
  { x: "d", y: 4 },
];

// Hovering a bar or a slice highlights both (the events guide's example).
export const Default: Story = {
  args: {},
  render: ({ themeKey, ...props }) => (
    <>
      <svg viewBox="0 0 450 350">
        <VictorySharedEvents
          {...props}
          events={[
            {
              childName: ["pie", "bar"],
              target: "data",
              eventHandlers: {
                onMouseOver: () => [
                  {
                    childName: ["pie", "bar"],
                    mutation: ({ style }) => ({
                      style: { ...style, fill: "tomato" },
                    }),
                  },
                ],
                onMouseOut: () => [
                  { childName: ["pie", "bar"], mutation: () => null },
                ],
              },
            },
          ]}
        >
          <g transform="translate(150, 50)">
            <VictoryBar
              name="bar"
              theme={VictoryTheme[themeKey]}
              width={300}
              standalone={false}
              style={{ data: { width: 20 } }}
              data={data}
            />
          </g>
          <g transform="translate(0, -75)">
            <VictoryPie
              name="pie"
              theme={VictoryTheme[themeKey]}
              width={250}
              standalone={false}
              data={data}
            />
          </g>
        </VictorySharedEvents>
      </svg>
    </>
  ),
};

export default meta;
