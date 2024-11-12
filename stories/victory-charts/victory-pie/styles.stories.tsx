import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const Styles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{
          labels: { fontSize: 20 },
          data: {
            stroke: "red",
            strokeWidth: 3,
            fillOpacity: 0.3,
          },
        }}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        colorScale="cool"
        style={{
          labels: { fontSize: 20 },
          data: {
            fillOpacity: 0.3,
          },
        }}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{
          labels: {
            fill: "white",
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
        data={[
          { x: "<5", y: 6279 },
          { x: "5-13", y: 9182 },
          { x: "14-17", y: 5511 },
          { x: "18-24", y: 7164 },
          { x: "25-44", y: 6716 },
          { x: "45-64", y: 4263 },
          { x: "≥65", y: 7502 },
        ]}
        innerRadius={100}
        labelRadius={110}
        colorScale={[
          "#D85F49",
          "#F66D3B",
          "#D92E1D",
          "#D73C4C",
          "#FFAF59",
          "#E28300",
          "#F6A57F",
        ]}
      />
    </>
  ),
};

export default meta;
