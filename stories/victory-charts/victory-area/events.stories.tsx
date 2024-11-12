import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryArea, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const Events: Story = {
  args: {},
  render: (props) => (
    <VictoryChart theme={VictoryTheme[props.themeKey]}>
      <VictoryArea
        {...props}
        style={{ data: { fill: "tomato" } }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    eventKey: "all",
                    target: "data",
                    mutation: (eventProps) => {
                      const fill = eventProps.style && eventProps.style.fill;
                      return fill === "black"
                        ? null
                        : { style: { fill: "black" } };
                    },
                  },
                ];
              },
            },
          },
        ]}
        data={getData(5)}
      />
    </VictoryChart>
  ),
};

export default meta;
