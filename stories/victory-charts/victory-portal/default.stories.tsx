import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryPortal,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
} from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPortal> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPortal",
};

export const Default: Story = {
  args: {},
  render: (props) => (
    <div style={{ height: "400px" }}>
      <VictoryChart domainPadding={{ x: 50 }}>
        <VictoryGroup offset={15}>
          <VictoryBar
            labels={["apples", "bananas", "cherries"]}
            style={{
              labels: { fontSize: 20, fill: "tomato" },
            }}
            labelComponent={
              <VictoryPortal {...props}>
                <VictoryLabel />
              </VictoryPortal>
            }
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 5 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 7 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 9 },
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  ),
};

export default meta;
