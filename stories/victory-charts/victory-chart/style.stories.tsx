import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const Style: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
        }}
      />
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        polar
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
        }}
      >
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      />
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        polar
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryGroup
          labels={["a", "b", "c"]}
          offset={20}
          colorScale={"qualitative"}
        >
          <VictoryBar
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
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        polar
        domainPadding={{ y: 30 }}
        innerRadius={30}
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryGroup
          labels={["a", "b", "c"]}
          offset={20}
          colorScale={"qualitative"}
          style={{ data: { width: 15 } }}
        >
          <VictoryBar
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
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domainPadding={{ x: 17 }}
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryStack labels={["a", "b", "c"]} colorScale={"qualitative"}>
          <VictoryBar
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
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        polar
        domainPadding={{ y: 30 }}
        style={{
          parent: {
            border: "5px solid #000",
            backgroundColor: "cyan",
          },
          background: { fill: "pink" },
        }}
      >
        <VictoryStack
          labels={["a", "b", "c"]}
          colorScale={"qualitative"}
          style={{ data: { width: 15 } }}
        >
          <VictoryBar
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
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
    </>
  ),
};

export default meta;
