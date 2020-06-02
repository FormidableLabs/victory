/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryLabel } from "../packages/victory-core/src/index";

const svgDecorator = () => {
  return (story) => {
    return (
      <svg width="500" height="500">
        {story()}
      </svg>
    );
  };
};

storiesOf("VictoryLabel.background", module)
  .addDecorator(svgDecorator())
  .add("single background on multiple lines", () => (
    <VictoryLabel
      backgroundStyle={{ fill: "pink" }}
      x={50}
      y={50}
      text={"Here is line one\nAnd some other details."}
    />
  ))
  .add("single background on angled label", () => (
    <VictoryLabel
      x={50}
      y={50}
      backgroundStyle={{ fill: "pink" }}
      angle={65}
      text={"An angled label"}
    />
  ))
  .add("single background on rtl", () => (
    <VictoryLabel
      x={50}
      y={50}
      backgroundStyle={{ fill: "pink" }}
      direction="rtl"
      verticalAnchor="start"
      text={"مرحبا!"}
    />
  ))
  .add("single background on start, start alignment", () => (
    <VictoryLabel
      x={50}
      y={50}
      backgroundStyle={{ fill: "pink" }}
      textAnchor="start"
      verticalAnchor="start"
      text={"This is in the top corner\nThis is (start, start) anchoring.\nAnd in the left corner"}
    />
  ))
  .add("single background on middle, middle alignment", () => (
    <VictoryLabel
      x={150}
      y={150}
      dy={50}
      backgroundStyle={{ fill: "pink" }}
      lineHeight={2}
      textAnchor="middle"
      verticalAnchor="middle"
      text={"In the middle\nAnd the middle again\nWith an explicit dy"}
    />
  ))
  .add("single background on inline, variable style label", () => (
    <VictoryLabel
      x={50}
      y={50}
      backgroundStyle={{ fill: "pink" }}
      verticalAnchor="middle"
      text={["This is an inline label", "with two styles."]}
      style={[{ fill: "#000" }, { fill: "#6128ff", fontSize: 27 }]}
      inline
      dx={25}
    />
  ))
  .add("single background with defaults", () => (
    <VictoryLabel
      backgroundStyle={{ fill: "pink" }}
      x={50}
      y={50}
      text={["Oops.", "Left props blank here", "Stuff should be handled with defaults"]}
      style={[]}
      lineHeight={[]}
      verticalAnchor="start"
    />
  ))
  .add("single background with inline list", () => (
    <VictoryLabel
      x={20}
      y={18}
      textAnchor="start"
      verticalAnchor="start"
      text={["Using", "dx", "attribute", "to", "shift", "labels", "relative to one another."]}
      inline
      dx={10}
      backgroundStyle={{ fill: "lavender" }}
    />
  ));
