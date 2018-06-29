/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { VictoryPie } from "../src";

storiesOf("VictoryPie", module)
  .addDecorator((story) => (
    <div style={{ width: 400, height: 400 }}>
      {story()}
    </div>
  ))
  .add("by default", () => (
    <VictoryPie />
  ))
  .add("with basic data", () => (
    <VictoryPie
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 }
      ]}
    />
  ))
  .add("with flexible data", () => (
    <VictoryPie
      data={[
        { animal: "Cat", pet: 45, wild: 17 },
        { animal: "Dog", pet: 85, wild: 6 },
        { animal: "Fish", pet: 55, wild: 0 },
        { animal: "Bird", pet: 15, wild: 40 }
      ]}
      x={"animal"}
      y={(data) => data.pet + data.wild}
    />
  ))
  .add("with configured styles", () => (
    <VictoryPie
      style={{
        labels: {
          fontSize: 20
        },
        data: {
          stroke: "transparent",
          opacity: 0.3
        }
      }}
    />
  ))
  .add("as a donut", () => (
    <VictoryPie innerRadius={140} />
  ))
  .add("as only a portion of a pie", () => (
    <VictoryPie
      endAngle={90}
      startAngle={-90}
    />
  ))
  .add("with space between slices", () => (
    <VictoryPie
      endAngle={90}
      innerRadius={140}
      padAngle={5}
      startAngle={-90}
    />
  ))
  .add("with a radius prop", () => (
    <VictoryPie
      radius={100}
    />
  ))
  .add("with an origin prop", () => (
    <VictoryPie
      radius={100}
      origin={{ x: 150, y: 150 }}
    />
  ))
  .add("with custom data and colors", () => (
    <VictoryPie
      style={{
        labels: {
          fill: "white",
          fontSize: 12,
          fontWeight: "bold"
        }
      }}
      data={[
        { x: "<5", y: 6279 },
        { x: "5-13", y: 9182 },
        { x: "14-17", y: 5511 },
        { x: "18-24", y: 7164 },
        { x: "25-44", y: 6716 },
        { x: "45-64", y: 4263 },
        { x: "≥65", y: 7502 }
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
        "#F6A57F"
      ]}
    />
  ))
  .add("with functional styles", () => (
    <VictoryPie
      style={{
        data: {
          stroke: (data) => data.y > 75 ? "red" : "transparent",
          strokeWidth: 3,
          opacity: (data) => data.y > 75 ? 1 : 0.4
        }
      }}
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 }
      ]}
    />
  ))
  .add("events: click handler", () => (
    <div className="chromatic-ignore">
      <VictoryPie
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 55 }
        ]}
        events={[{
          target: "data",
          eventHandlers: {
            onClick: (event, props) => {
              action("click a slice of pie")();
              const fill = props.style.fill;
              return {
                mutation: () => {
                  return fill === "red" ? null : { style: { fill: "red" } };
                }
              };
            }
          }
        }]}
      />
    </div>
  ));
