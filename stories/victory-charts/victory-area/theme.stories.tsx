import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryArea,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";
import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const Theme: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} data={getData(8)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(8)} />
          <VictoryArea {...props} data={getData(8, "seed-1")} />
          <VictoryArea {...props} data={getData(8, "seed-2")} />
          <VictoryArea {...props} data={getData(8, "seed-3")} />
          <VictoryArea {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.grayscale}>
        <VictoryArea {...props} data={getData(8)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.grayscale}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(8)} />
          <VictoryArea {...props} data={getData(8, "seed-1")} />
          <VictoryArea {...props} data={getData(8, "seed-2")} />
          <VictoryArea {...props} data={getData(8, "seed-3")} />
          <VictoryArea {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryArea {...props} data={getData(8)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryArea {...props} data={getData(8)} />
          <VictoryArea {...props} data={getData(8, "seed-1")} />
          <VictoryArea {...props} data={getData(8, "seed-2")} />
          <VictoryArea {...props} data={getData(8, "seed-3")} />
          <VictoryArea {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
