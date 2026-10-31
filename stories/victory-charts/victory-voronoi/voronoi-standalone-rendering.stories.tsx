import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryVoronoi, VictoryTheme } from "@/victory";

import { sampleData } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

export const StandaloneRendering: Story = {
  args: {
    themeKey: "clean",
  },
  render: (props) => (
    <>
      <VictoryVoronoi theme={VictoryTheme[props.themeKey]} data={sampleData} />
      <svg
        width={300}
        height={300}
        style={{
          display: "block",
          margin: "0 auto",
        }}
      >
        <circle cx={150} cy={150} r={150} fill="#9ded91" />
        <VictoryVoronoi
          standalone={false}
          theme={VictoryTheme[props.themeKey]}
          width={300}
          height={300}
          data={sampleData}
        />
      </svg>
    </>
  ),
};

export default meta;
