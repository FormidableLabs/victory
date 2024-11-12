import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryHistogram,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { data } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const Stacked: Story = {
  args: {},
  render: (props) => {
    const stackedData = [
      ...[50, 30, 100, 32, 50, 10, 49, 78, 20].map((count) =>
        getData(count, count.toString(), 100),
      ),
      [{ x: 1 }, { x: 3 }, { x: 1 }, { x: 2 }],
    ];

    return (
      <>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryStack colorScale="qualitative" bins={[0, 20, 65, 90, 100]}>
            {stackedData.map((d, index) => (
              <VictoryHistogram {...props} data={d} key={index} />
            ))}
          </VictoryStack>
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryStack colorScale="qualitative" bins={[0, 20, 65, 90, 100]}>
            {stackedData.map((d, index) => (
              <VictoryHistogram {...props} data={d} key={index} />
            ))}
          </VictoryStack>
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryStack colorScale="qualitative" bins={5}>
            {stackedData.map((d, index) => (
              <VictoryHistogram
                {...props}
                data={d}
                key={index}
                bins={index === 0 ? [0, 20, 100] : undefined}
              />
            ))}
          </VictoryStack>
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryStack colorScale="qualitative" bins={5}>
            {stackedData.map((d, index) => (
              <VictoryHistogram
                {...props}
                binSpacing={10}
                data={d}
                key={index}
              />
            ))}
          </VictoryStack>
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryStack colorScale="qualitative">
            <VictoryHistogram
              {...props}
              data={data.map(({ x }) => ({ a: { b: { c: x } } }))}
              x="a.b.c"
            />
            {stackedData.map((d, index) => (
              <VictoryHistogram {...props} data={d} key={index} />
            ))}
          </VictoryStack>
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryStack colorScale="qualitative">
            <VictoryHistogram
              {...props}
              data={data.map(({ x }) => ({ a: { b: { c: x } } }))}
              x="a.b.c"
            />
            {stackedData.map((d, index) => (
              <VictoryHistogram {...props} data={d} key={index} />
            ))}
          </VictoryStack>
        </VictoryChart>
      </>
    );
  },
};

export default meta;
