import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryErrorBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryErrorBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryErrorBar",
};

export const Domain: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryErrorBar
        {...props}
        domain={{ x: [2, 5], y: [25, 100] }}
        data={[
          { x: 1, y: 9, errorX: 0.3, errorY: 3 },
          { x: 2, y: 80, errorX: 0.5, errorY: 2 },
          { x: 3, y: 50, errorX: 1.1, errorY: 2 },
          { x: 4, y: 70, errorX: 0.2, errorY: 3 },
          { x: 5, y: 20, errorX: 0.3, errorY: 2 },
        ]}
      />
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        domain={{ x: [2, 5], y: [25, 100] }}
      >
        <VictoryErrorBar
          {...props}
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3 },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2 },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2 },
          ]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} minDomain={{ x: 3 }}>
        <VictoryErrorBar
          {...props}
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3 },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2 },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2 },
          ]}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} maxDomain={{ y: 65 }}>
        <VictoryErrorBar
          {...props}
          data={[
            { x: 1, y: 9, errorX: 0.3, errorY: 3 },
            { x: 2, y: 80, errorX: 0.5, errorY: 2 },
            { x: 3, y: 50, errorX: 1.1, errorY: 2 },
            { x: 4, y: 70, errorX: 0.2, errorY: 3 },
            { x: 5, y: 20, errorX: 0.3, errorY: 2 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
