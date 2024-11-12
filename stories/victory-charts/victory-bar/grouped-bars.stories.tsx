import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData, getMixedData } from "../../utils/data";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const GroupedBars: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
          <VictoryBar {...props} data={getData(3)} />
          <VictoryBar {...props} data={getData(3, "seed-1")} />
          <VictoryBar {...props} data={getData(3, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup offset={10} labels={({ datum }) => datum.x}>
          <VictoryBar {...props} data={getData(5)} />
          <VictoryBar {...props} data={getData(3, "seed-1")} />
          <VictoryBar {...props} data={getData(2, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
          <VictoryBar {...props} data={getMixedData(3)} />
          <VictoryBar {...props} data={getMixedData(3, "seed")} />
          <VictoryBar {...props} data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
          <VictoryBar {...props} data={getMixedData(3)} />
          <VictoryBar {...props} data={getMixedData(3, "seed")} />
          <VictoryBar {...props} data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar {...props} data={getMixedData(3)} />
          <VictoryBar {...props} data={getMixedData(3, "seed")} />
          <VictoryBar {...props} data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar {...props} data={getMixedData(3)} />
          <VictoryBar {...props} data={getMixedData(3, "seed")} />
          <VictoryBar {...props} data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          style={{ data: { width: 15 } }}
        >
          <VictoryStack colorScale="red">
            <VictoryBar {...props} data={getData(3)} />
            <VictoryBar {...props} data={getData(3, "seed-1")} />
            <VictoryBar {...props} data={getData(3, "seed-2")} />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar {...props} data={getData(3)} />
            <VictoryBar {...props} data={getData(3, "seed-3")} />
            <VictoryBar {...props} data={getData(3, "seed-4")} />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar {...props} data={getData(3)} />
            <VictoryBar {...props} data={getData(3, "seed-5")} />
            <VictoryBar {...props} data={getData(3, "seed-6")} />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          style={{ data: { width: 15 } }}
        >
          <VictoryStack colorScale="red">
            <VictoryBar {...props} data={getData(3)} />
            <VictoryBar {...props} data={getData(3, "seed-1")} />
            <VictoryBar {...props} data={getData(3, "seed-2")} />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar {...props} data={getData(3)} />
            <VictoryBar {...props} data={getData(3, "seed-3")} />
            <VictoryBar {...props} data={getData(3, "seed-4")} />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar {...props} data={getData(3)} />
            <VictoryBar {...props} data={getData(3, "seed-5")} />
            <VictoryBar {...props} data={getData(3, "seed-6")} />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryStack colorScale="red">
            <VictoryBar {...props} data={getMixedData(3)} barWidth={6} />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-1")}
              barWidth={6}
            />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-2")}
              barWidth={6}
            />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar {...props} data={getMixedData(3)} barWidth={6} />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-3")}
              barWidth={6}
            />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-4")}
              barWidth={6}
            />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar {...props} data={getMixedData(3)} barWidth={6} />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-5")}
              barWidth={6}
            />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-6")}
              barWidth={6}
            />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryStack colorScale="red">
            <VictoryBar {...props} data={getMixedData(3)} barWidth={6} />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-1")}
              barWidth={6}
            />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-2")}
              barWidth={6}
            />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar {...props} data={getMixedData(3)} barWidth={6} />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-3")}
              barWidth={6}
            />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-4")}
              barWidth={6}
            />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar {...props} data={getMixedData(3)} barWidth={6} />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-5")}
              barWidth={6}
            />
            <VictoryBar
              {...props}
              data={getMixedData(3, "seed-6")}
              barWidth={6}
            />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </>
  ),
};

export default meta;
