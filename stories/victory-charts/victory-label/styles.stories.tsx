import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const Styles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={{ fontSize: 20, fontFamily: "arial" }}
            text={["single", "style", "object"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[{ fontSize: 20, fontFamily: "arial" }]}
            text={["single", "element", "array"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[
              { fontSize: 20, fontFamily: "arial" },
              { fontSize: 18, fill: "red", fontFamily: "arial" },
            ]}
            text={["multi", "element", "array"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={{ fontSize: 20, fontFamily: "arial" }}
            text={["single", "style", "object"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[{ fontSize: 20, fontFamily: "arial" }]}
            text={["single", "element", "array"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[
              { fontSize: 20, fontFamily: "arial" },
              { fontSize: 12, fill: "red", fontFamily: "arial" },
            ]}
            text={["multi", "element", "array"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={{
              fontSize: ({ datum }) => (datum.y === 0 ? 12 : 15),
              fontFamily: "arial",
            }}
            text={["object", "with", "functions"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[
              {
                fontSize: ({ datum }) => (datum.y === 0 ? 12 : 15),
                fontFamily: "arial",
              },
            ]}
            text={["single array", "with", "functions"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[
              {
                fontSize: ({ datum }) => (datum.y === 0 ? 12 : 15),
                fontFamily: "arial",
              },
              {
                fill: ({ datum }) => (datum.y === 0 ? "red" : "blue"),
                fontFamily: "arial",
              },
            ]}
            text={["multi array", "with", "functions"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={{
              fontSize: ({ datum }) => (datum.y === 0 ? 12 : 15),
              fontFamily: "arial",
            }}
            text={["object", "with", "functions"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[
              {
                fontSize: ({ datum }) => (datum.y === 0 ? 12 : 15),
                fontFamily: "arial",
              },
            ]}
            text={["single array", "with", "functions"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            {...props}
            style={[
              {
                fontSize: ({ datum }) => (datum.y === 0 ? 12 : 15),
                fontFamily: "arial",
              },
              {
                fill: ({ datum }) => (datum.y === 0 ? "red" : "blue"),
                fontFamily: "arial",
              },
            ]}
            text={["multi array", "with", "functions"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
    </>
  ),
};

export default meta;
