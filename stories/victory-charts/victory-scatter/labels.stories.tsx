import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryScatter, VictoryChart } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const Labels: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart>
        <VictoryScatter
          {...props}
          data={getData(7)}
          labels={({ datum }) => `x: ${datum.x}`}
        />
      </VictoryChart>
      <VictoryChart>
        <VictoryScatter
          {...props}
          data={getData(7)}
          labels={["", "", "three", "four", "5", "six"]}
        />
      </VictoryChart>
      <VictoryChart>
        <VictoryScatter
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
    </>
  ),
};

export default meta;
