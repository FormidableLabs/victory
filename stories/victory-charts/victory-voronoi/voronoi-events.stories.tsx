import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryChart, VictoryVoronoi, VictoryTheme } from "@/victory";

import { sampleData } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const Events: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <>
      <VictoryChart
        domain={{ x: [0, 5], y: [0, 7] }}
        theme={VictoryTheme[props.themeKey]}
      >
        <VictoryVoronoi
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style && props.style.fill;
                        return fill === "white"
                          ? null
                          : {
                              style: {
                                fill: "white",
                              },
                            };
                      },
                    },
                  ];
                },
              },
            },
          ]}
          data={sampleData}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
