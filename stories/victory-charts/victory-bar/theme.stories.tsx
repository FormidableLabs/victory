import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Theme: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(8)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryBar {...props} data={getData(8)} />
          <VictoryBar {...props} data={getData(8, "seed-1")} />
          <VictoryBar {...props} data={getData(8, "seed-2")} />
          <VictoryBar {...props} data={getData(8, "seed-3")} />
          <VictoryBar {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.grayscale}>
        <VictoryBar {...props} data={getData(8)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.grayscale}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryBar {...props} data={getData(8)} />
          <VictoryBar {...props} data={getData(8, "seed-1")} />
          <VictoryBar {...props} data={getData(8, "seed-2")} />
          <VictoryBar {...props} data={getData(8, "seed-3")} />
          <VictoryBar {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryBar {...props} data={getData(8)} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryBar {...props} data={getData(8)} />
          <VictoryBar {...props} data={getData(8, "seed-1")} />
          <VictoryBar {...props} data={getData(8, "seed-2")} />
          <VictoryBar {...props} data={getData(8, "seed-3")} />
          <VictoryBar {...props} data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
