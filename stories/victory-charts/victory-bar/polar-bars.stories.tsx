import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const PolarBars: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar>
        <VictoryBar
          {...props}
          style={{ data: { width: 20 } }}
          data={getData(7)}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar>
        <VictoryBar
          {...props}
          style={{ data: { stroke: "red", strokeWidth: 2 } }}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar endAngle={180}>
        <VictoryBar
          {...props}
          style={{ data: { stroke: "red", strokeWidth: 2 } }}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar>
        <VictoryStack colorScale="qualitative">
          <VictoryBar {...props} data={getData(7)} />
          <VictoryBar {...props} data={getData(7, "seed-1")} />
          <VictoryBar {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar>
        <VictoryStack colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar {...props} data={getData(7)} />
          <VictoryBar {...props} data={getData(7, "seed-1")} />
          <VictoryBar {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar>
        <VictoryGroup
          offset={25}
          colorScale="qualitative"
          style={{ data: { width: 15 } }}
        >
          <VictoryBar {...props} data={getData(5)} />
          <VictoryBar {...props} data={getData(5, "seed-1")} />
          <VictoryBar {...props} data={getData(5, "seed-2")} />
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar innerRadius={50}>
        <VictoryGroup
          offset={25}
          colorScale="qualitative"
          style={{ data: { width: 15 } }}
        >
          <VictoryBar {...props} data={getData(5)} />
          <VictoryBar {...props} data={getData(5, "seed-1")} />
          <VictoryBar {...props} data={getData(5, "seed-2")} />
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        polar
        endAngle={180}
        innerRadius={50}
      >
        <VictoryStack colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar {...props} data={getData(5)} />
          <VictoryBar {...props} data={getData(5, "seed-1")} />
          <VictoryBar {...props} data={getData(5, "seed-2")} />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  ),
};

export default meta;
