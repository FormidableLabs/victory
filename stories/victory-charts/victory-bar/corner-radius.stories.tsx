import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData, getMixedData } from "../../utils/data";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const CornerRadius: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(7)} cornerRadius={1} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(7)} cornerRadius={5} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(7)} cornerRadius={7} />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(7)} cornerRadius={7} />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={20}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={20}
        />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={{
            topLeft: 5,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 0,
          }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={{
            topLeft: 5,
            topRight: 20,
            bottomLeft: 20,
            bottomRight: 0,
          }}
        />
      </VictoryChart>
      <VictoryChart polar innerRadius={60} theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={[
            { x: 45, y: 6 },
            { x: 90, y: 30 },
            { x: 135, y: 65 },
            { x: 180, y: 50 },
            { x: 270, y: 40 },
            { x: 315, y: 30 },
          ]}
          style={{ data: { fill: "tomato", width: 40 } }}
          cornerRadius={{
            topRight: 1,
            topLeft: 20,
            bottomRight: 5,
            bottomLeft: 0,
          }}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
        />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={[
            { x: 45, y: 6 },
            { x: 90, y: 30 },
            { x: 135, y: 65 },
            { x: 180, y: 50 },
            { x: 270, y: 40 },
            { x: 315, y: 30 },
          ]}
          style={{ data: { fill: "tomato", width: 40 } }}
          cornerRadius={{
            topRight: 1,
            topLeft: 20,
            bottomRight: 5,
            bottomLeft: 0,
          }}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
