import React from "react";
import { VictoryChart } from "../packages/victory-chart";
import { VictoryBar } from "../packages/victory-bar";
import { VictoryGroup } from "../packages/victory-group";
import { VictoryLabel, VictoryPortal } from "../packages/victory-core";
import { Meta } from "@storybook/react";
import { storyContainer } from "./decorators";

const meta: Meta = {
  title: "Victory Charts/SVG Container/VictoryPortal",
  component: VictoryPortal,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

export const Default = () => {
  return (
    <div style={{ height: "400px" }}>
      <VictoryChart domainPadding={{ x: 50 }}>
        <VictoryGroup offset={15}>
          <VictoryBar
            labels={["apples", "bananas", "cherries"]}
            style={{
              labels: { fontSize: 20, fill: "tomato" },
            }}
            labelComponent={
              <VictoryPortal>
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
  );
};
