import React from "react";
import type { Meta } from "@storybook/react";
import range from "lodash/range";

import {
  VictoryAxis,
  VictoryLegend,
  VictoryChart,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLegend> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLegend",
};

const getData = (num) => {
  return range(num).map((v) => ({
    name: `Series ${v + 1}`,
    symbol: {
      size: 5,
      type: "circle",
      fill: undefined,
    },
  }));
};

export const Title: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          orientation="horizontal"
          itemsPerRow={3}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          centerTitle
          itemsPerRow={3}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          centerTitle
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          orientation="horizontal"
          itemsPerRow={3}
          style={{ title: { padding: 20 } }}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          titleOrientation="bottom"
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          titleOrientation="left"
          centerTitle
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis />
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          titleOrientation="right"
          style={{ title: { padding: 20 } }}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
