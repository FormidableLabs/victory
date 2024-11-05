import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryScatter, VictoryChart, VictoryStack, VictoryTheme } from "@/victory";

import { getData, getMixedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const Theme: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart>
        <VictoryScatter {...props}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(8)} />
          <VictoryScatter {...props} data={getData(8, "seed-1")} />
          <VictoryScatter {...props} data={getData(8, "seed-2")} />
          <VictoryScatter {...props} data={getData(8, "seed-3")} />
          <VictoryScatter {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryScatter {...props}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(8)} />
          <VictoryScatter {...props} data={getData(8, "seed-1")} />
          <VictoryScatter {...props} data={getData(8, "seed-2")} />
          <VictoryScatter {...props} data={getData(8, "seed-3")} />
          <VictoryScatter {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryScatter {...props}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryScatter {...props} data={getData(8)} />
          <VictoryScatter {...props} data={getData(8, "seed-1")} />
          <VictoryScatter {...props} data={getData(8, "seed-2")} />
          <VictoryScatter {...props} data={getData(8, "seed-3")} />
          <VictoryScatter {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
