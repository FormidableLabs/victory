import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";

import { getData, getDataWithBaseline, getMixedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const StackedBars: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar {...props} data={getData(7)} />
          <VictoryBar {...props} data={getData(7, "seed-1")} />
          <VictoryBar {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={8}>
        <VictoryStack>
          <VictoryBar
            {...props}
            data={getData(7)}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
          <VictoryBar
            {...props}
            data={getData(7, "seed-1")}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
          <VictoryBar
            {...props}
            data={getData(7, "seed-2")}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar {...props} data={getData(9)} />
          <VictoryBar {...props} data={getData(5, "seed-1")} />
          <VictoryBar {...props} data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar {...props} data={getMixedData(7)} />
          <VictoryBar {...props} data={getMixedData(7, "seed-1")} />
          <VictoryBar {...props} data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        horizontal
        theme={VictoryTheme[props.themeKey]}
        domainPadding={8}
      >
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar {...props} data={getMixedData(7)} />
          <VictoryBar {...props} data={getMixedData(7, "seed-1")} />
          <VictoryBar {...props} data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={8}>
        <VictoryStack
          labels={({ datum }) => datum._y1.toPrecision(2)}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar {...props} data={getMixedData(7)} />
          <VictoryBar {...props} data={getMixedData(7, "seed-1")} />
          <VictoryBar {...props} data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        horizontal
        theme={VictoryTheme[props.themeKey]}
        domainPadding={8}
      >
        <VictoryStack
          labels={({ datum }) => datum._y1.toPrecision(2)}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar {...props} data={getMixedData(7)} />
          <VictoryBar {...props} data={getMixedData(7, "seed-1")} />
          <VictoryBar {...props} data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack>
          <VictoryBar {...props} data={getData(90)} />
          <VictoryBar {...props} data={getData(50, "seed-1")} />
          <VictoryBar {...props} data={getData(200, "seed-2")} />
          <VictoryBar {...props} data={getData(30, "seed-3")} />
          <VictoryBar {...props} data={getData(200, "seed-4")} />
          <VictoryBar {...props} data={getData(100, "seed-5")} />
          <VictoryBar {...props} data={getData(200, "seed-6")} />
          <VictoryBar {...props} data={getData(190, "seed-7")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryStack>
          <VictoryBar {...props} data={getDataWithBaseline(7)} />
          <VictoryBar {...props} data={getData(7, "seed-1")} />
          <VictoryBar {...props} data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
