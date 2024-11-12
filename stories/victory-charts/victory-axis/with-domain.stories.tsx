import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
} from "@/victory";

import { getValues } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const WithDomain: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={[-10, 10]}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={[-10, 10]}
        tickValues={getValues(5)}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={[-10, 10]}
        tickValues={[8, 9, 10, 11, 12, 13]}
      />
      <VictoryAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={[-2, 2]}
        tickValues={["cat", "dog", "bird"]}
      />
      <VictoryChart theme={VictoryTheme[props.themeKey]} domain={[1, 4]}>
        <VictoryScatter
          data={[
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryAxis {...props} dependentAxis />
        <VictoryAxis {...props} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domain={[1, 4]}>
        <VictoryScatter
          data={[
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryAxis {...props} dependentAxis invertAxis />
        <VictoryAxis {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
