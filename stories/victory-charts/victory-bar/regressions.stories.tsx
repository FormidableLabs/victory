import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getData, getStackedData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Regressions: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryGroup offset={20} style={{ data: { width: 10 } }}>
          <VictoryStack colorScale={"red"}>
            {getStackedData(5, 3, "useStrings").map((data, index) => {
              return (
                <VictoryBar {...props} horizontal key={index} data={data} />
              );
            })}
          </VictoryStack>
          <VictoryStack colorScale={"green"}>
            {getStackedData(5, 3, "useStrings").map((data, index) => {
              return (
                <VictoryBar {...props} horizontal key={index} data={data} />
              );
            })}
          </VictoryStack>
          <VictoryStack colorScale={"blue"}>
            {getStackedData(5, 3, "useStrings").map((data, index) => {
              return (
                <VictoryBar {...props} horizontal key={index} data={data} />
              );
            })}
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart>
        <VictoryGroup
          offset={20}
          style={{ data: { width: 15 } }}
          labels={({ datum }) => datum.x}
        >
          <VictoryStack colorScale="red">
            <VictoryBar {...props} data={getData(4)} />
            <VictoryBar {...props} data={getData(4, "seed-1")} />
            <VictoryBar {...props} data={getData(4, "seed-2")} />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar {...props} data={getData(4)} />
            <VictoryBar {...props} data={getData(4, "seed-3")} />
            <VictoryBar {...props} data={getData(4, "seed-4")} />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar {...props} data={getData(4)} />
            <VictoryBar {...props} data={getData(4, "seed-5")} />
            <VictoryBar {...props} data={getData(4, "seed-6")} />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </>
  ),
};

export default meta;
