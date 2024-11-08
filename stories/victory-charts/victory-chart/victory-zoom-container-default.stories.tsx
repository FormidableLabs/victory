import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const VictoryZoomContainerDefault: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            zoomDomain={{ x: [new Date(1993, 1, 1), new Date(2005, 1, 1)] }}
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: "red", strokeWidth: 5 },
          }}
          data={[
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: 132 },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
