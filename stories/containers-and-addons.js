/* eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryChart } from "victory-chart";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";
import { VictoryZoomContainer } from "victory-zoom-container";
import { VictoryCursorContainer } from "victory-cursor-container";
import { VictoryBrushContainer } from "victory-brush-container";
import { VictoryBrushLine } from "victory-brush-line";

// only add visual test for containers that have visual elements without interaction
storiesOf("Containers and Addons.VictoryBrushContainer", module)
  .add("with VictoryBrushContainer", () => (
    <VictoryChart containerComponent={<VictoryBrushContainer />} />
  ))
  .add("with VictoryBrushContainer with domain", () => (
    <VictoryChart
      containerComponent={
        <VictoryBrushContainer brushDomain={{ x: [0, 0.5], y: [0.5, 1] }} />
      }
    />
  ))
  .add("with VictoryBrushContainer with domain (horizontal)", () => (
    <VictoryChart
      horizontal
      containerComponent={
        <VictoryBrushContainer brushDomain={{ x: [0, 0.5], y: [0.5, 1] }} />
      }
    />
  ))
  .add("with VictoryBrushContainer with brushStyle", () => (
    <VictoryChart
      containerComponent={
        <VictoryBrushContainer
          brushStyle={{ fill: "teal", stroke: "teal", fillOpacity: 0.2 }}
        />
      }
    />
  ));

storiesOf("Containers and Addons.VictoryBrushLine", module)
  .add("brush axis", () => <VictoryAxis axisComponent={<VictoryBrushLine />} />)
  .add("brush axis with initial brush", () => (
    <VictoryAxis
      axisComponent={<VictoryBrushLine brushDomain={[0.25, 0.5]} />}
    />
  ))
  .add("brush gridline", () => (
    <VictoryAxis gridComponent={<VictoryBrushLine />} />
  ))
  .add("brush gridline with initial brushes", () => (
    <VictoryAxis
      gridComponent={<VictoryBrushLine brushDomain={[0.25, 0.5]} />}
    />
  ))
  .add("brush gridline with styles", () => (
    <VictoryAxis
      gridComponent={
        <VictoryBrushLine
          brushDomain={[0.25, 0.5]}
          brushAreaStyle={{ fill: "orange", stroke: "tomato", strokeWidth: 2 }}
          brushStyle={{ fill: "teal", stroke: "navy", strokeWidth: 2 }}
          handleStyle={{ strokeWidth: 1, stroke: "grey" }}
        />
      }
    />
  ))
  .add("brush gridline with widths", () => (
    <VictoryAxis
      gridComponent={
        <VictoryBrushLine
          brushDomain={[0.25, 0.5]}
          brushWidth={40}
          brushAreaWidth={20}
          handleWidth={4}
          brushAreaStyle={{ fill: "orange", stroke: "tomato", strokeWidth: 2 }}
          brushStyle={{ fill: "teal", stroke: "navy", strokeWidth: 2 }}
          handleStyle={{ strokeWidth: 1, stroke: "grey" }}
        />
      }
    />
  ));

storiesOf("Containers and Addons.VictoryCursorContainer", module)
  .add("with VictoryCursorContainer with defaultCursorValue", () => (
    <VictoryChart
      containerComponent={
        <VictoryCursorContainer
          cursorLabel={({ datum }) => datum.x}
          defaultCursorValue={{ x: 0.25, y: 0.75 }}
        />
      }
    />
  ))
  .add(
    "with VictoryCursorContainer with defaultCursorValue (horizontal)",
    () => (
      <VictoryChart
        horizontal
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) => datum.x}
            defaultCursorValue={{ x: 0.25, y: 0.75 }}
          />
        }
      />
    ),
  );

storiesOf("Containers and Addons.VictoryZoomContainer", module).add(
  "with VictoryZoomContainer with initial zoom",
  () => (
    <VictoryChart
      scale={{ x: "time" }}
      containerComponent={
        <VictoryZoomContainer
          zoomDomain={{ x: [new Date(1993, 1, 1), new Date(2005, 1, 1)] }}
          dimension="x"
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
  ),
);
