import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryAxis",
};

export const AxisValue: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} tickValues={[1, 2, 3, 4, 5]} />
        <VictoryAxis {...props} dependentAxis axisValue={3} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis {...props} axisValue={"zero"} />
        <VictoryAxis {...props} dependentAxis tickValues={["-", "zero", "+"]} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} scale={{ x: "time" }}>
        <VictoryAxis
          {...props}
          tickValues={[
            new Date(1985, 1, 1),
            new Date(1995, 1, 1),
            new Date(2005, 1, 1),
            new Date(2015, 1, 1),
          ]}
          tickFormat={(t) => t.getFullYear()}
        />
        <VictoryAxis
          {...props}
          dependentAxis
          axisValue={new Date(2000, 1, 1)}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBar
          data={[
            { x: "a", y: 1 },
            { x: "b", y: 2 },
            { x: "c", y: 5 },
          ]}
        />
        <VictoryAxis {...props} dependentAxis axisValue="b" />
        <VictoryAxis {...props} />
      </VictoryChart>
    </>
  ),
};

export default meta;
