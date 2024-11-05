import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryLine,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getData, getMixedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const Theme: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart>
        <VictoryLine
          {...props}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(8)} />
          <VictoryLine {...props} data={getData(8, "seed-1")} />
          <VictoryLine {...props} data={getData(8, "seed-2")} />
          <VictoryLine {...props} data={getData(8, "seed-3")} />
          <VictoryLine {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          {...props}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(8)} />
          <VictoryLine {...props} data={getData(8, "seed-1")} />
          <VictoryLine {...props} data={getData(8, "seed-2")} />
          <VictoryLine {...props} data={getData(8, "seed-3")} />
          <VictoryLine {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryLine
          {...props}
          data={getMixedData(8)}
          labels={({ datum }) => datum.x}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryLine {...props} data={getData(8)} />
          <VictoryLine {...props} data={getData(8, "seed-1")} />
          <VictoryLine {...props} data={getData(8, "seed-2")} />
          <VictoryLine {...props} data={getData(8, "seed-3")} />
          <VictoryLine {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
