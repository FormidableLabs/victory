import React from "react";
import type { Meta } from "../../utils/types";

import {
  createContainer,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainerProps,
  VictoryVoronoiContainerProps,
} from "victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

const ZoomVoronoiContainer = createContainer<
  VictoryZoomContainerProps,
  VictoryVoronoiContainerProps
>("zoom", "voronoi");

// A container made with `createContainer`: drag to pan, wheel to zoom, and
// hover for tooltips.
export const VictoryZoomVoronoiContainer: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        containerComponent={
          <ZoomVoronoiContainer
            zoomDimension="x"
            zoomDomain={{ x: [3, 8] }}
            voronoiDimension="x"
            labels={({ datum }) => `y: ${datum.y.toFixed(1)}`}
            labelComponent={<VictoryTooltip />}
          />
        }
      >
        <VictoryLine data={getData(10)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
