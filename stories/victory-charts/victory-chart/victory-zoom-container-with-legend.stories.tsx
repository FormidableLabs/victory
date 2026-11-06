import React from "react";
import type { Meta } from "../../utils/types";

import {
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

// A legend with a title inside a zoomable chart (#3048 reported a crash in
// the legend's title props with React 19).
export const VictoryZoomContainerWithLegend: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryLegend
          x={60}
          y={10}
          title="Series"
          orientation="horizontal"
          data={[{ name: "One" }, { name: "Two" }]}
        />
        <VictoryLine data={getData(10)} />
        <VictoryLine data={getData(10, "seed-1")} />
      </VictoryChart>
    </>
  ),
};

export default meta;
