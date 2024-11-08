import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLine, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const Events: Story = {
  args: {},
  render: (props) => (
    <VictoryChart theme={VictoryTheme[props.themeKey]}>
      <VictoryLine {...props}
        style={{
          data: { stroke: "#c43a31" },
        }}
        events={[
          {
            target: "parent",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "data",
                    eventKey: "all",
                    mutation: ({ style }) => {
                      return style.stroke === "black"
                        ? null
                        : { style: { stroke: "black", strokeWidth: 5 } };
                    },
                  },
                ];
              },
            },
          },
        ]}
        data={getData(5, "seed-1")}
      />
    </VictoryChart>
  ),
};

export default meta;
