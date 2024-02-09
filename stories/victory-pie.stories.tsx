import React from "react";
import { VictoryPie, Slice, CurvedLabel } from "../packages/victory-pie";
import { VictoryTooltip } from "../packages/victory-tooltip";
import { LineSegment, VictoryTheme, Helpers } from "../packages/victory-core";
import { fromJS } from "immutable";
import styled from "styled-components";
import { Meta } from "@storybook/react";
import { storyContainer } from "./decorators";

const meta: Meta<typeof VictoryPie> = {
  title: "Victory Charts/SVG Container/VictoryPie",
  component: VictoryPie,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

export const DefaultRendering = () => {
  return (
    <>
      <VictoryPie style={parentStyle} />
      <VictoryPie style={parentStyle} theme={VictoryTheme.material} />
    </>
  );
};

export const Data = () => {
  return (
    <>
      <VictoryPie
        style={parentStyle}
        data={[
          { x: "Cat", y: 63 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 55 },
        ]}
      />
      <VictoryPie
        style={parentStyle}
        data={[
          { animal: "Cat", pet: 45, wild: 17 },
          { animal: "Dog", pet: 85, wild: 6 },
          { animal: "Fish", pet: 55, wild: 0 },
          { animal: "Bird", pet: 15, wild: 40 },
        ]}
        x={"animal"}
        y={(data) => data.pet + data.wild}
      />
      <VictoryPie
        style={parentStyle}
        data={fromJS([
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 55 },
        ])}
      />
    </>
  );
};

export const Radius = () => {
  return (
    <>
      <VictoryPie style={parentStyle} radius={100} />
      <VictoryPie
        style={parentStyle}
        radius={({ datum }) => datum.radius}
        data={[
          { x: 1, y: 1, radius: 110 },
          { x: 2, y: 3, radius: 120 },
          { x: 3, y: 5, radius: 140 },
          { x: 4, y: 2, radius: 150 },
          { x: 5, y: 3, radius: 130 },
        ]}
      />
      <VictoryPie
        radius={({ datum }) => datum.y + 100}
        labelRadius={({ datum }) => datum.y + 50}
        style={{
          ...parentStyle,
          labels: { fill: "white" },
        }}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 25 },
        ]}
      />
      <VictoryPie
        innerRadius={80}
        radius={({ datum }) => datum.y + 100}
        labelRadius={({ datum }) => datum.y + 65}
        style={{
          ...parentStyle,
          labels: { fill: "white" },
        }}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 25 },
        ]}
      />
    </>
  );
};

export const InnerRadius = () => {
  return (
    <>
      <VictoryPie style={parentStyle} innerRadius={100} />
      <VictoryPie
        style={parentStyle}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.radius - 20}
        data={[
          { x: 1, y: 1, radius: 110 },
          { x: 2, y: 3, radius: 120 },
          { x: 3, y: 5, radius: 140 },
          { x: 4, y: 2, radius: 150 },
          { x: 5, y: 3, radius: 130 },
        ]}
      />
      <VictoryPie
        style={parentStyle}
        innerRadius={({ datum }) => datum.y + 10}
        labelRadius={({ datum }) => datum.y - 20}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 25 },
        ]}
      />
      <VictoryPie
        style={parentStyle}
        innerRadius={({ datum }) => datum.radius}
        data={[
          { x: 1, y: 1, radius: 50 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
    </>
  );
};

export const CornerRadius = () => {
  return (
    <>
      <VictoryPie style={parentStyle} cornerRadius={10} />
      <VictoryPie style={parentStyle} cornerRadius={10} innerRadius={100} />
      <VictoryPie
        style={parentStyle}
        cornerRadius={({ datum }) => datum.x * 5}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
      <VictoryPie
        style={parentStyle}
        cornerRadius={({ datum }) => datum.r}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5, r: 15 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
    </>
  );
};

export const PadAngle = () => {
  return (
    <>
      <VictoryPie style={parentStyle} padAngle={6} />
      <VictoryPie style={parentStyle} padAngle={6} innerRadius={100} />
      <VictoryPie
        style={parentStyle}
        padAngle={({ datum }) => datum.x * 2}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
      <VictoryPie
        style={parentStyle}
        padAngle={({ datum }) => datum.r}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5, r: 8 },
          { x: 4, y: 2 },
          { x: 5, y: 3 },
        ]}
      />
    </>
  );
};

export const Labels = () => {
  return (
    <>
      <VictoryPie
        style={parentStyle}
        labels={["one", "two", "three", "four"]}
      />
      <VictoryPie style={parentStyle} labels={({ index }) => `#${index}`} />
      <VictoryPie
        style={parentStyle}
        labels={({ index }) => `#${index}`}
        labelPosition="startAngle"
      />
      <VictoryPie
        style={parentStyle}
        labels={({ index }) => `#${index}`}
        labelPosition="endAngle"
      />
      <VictoryPie
        style={parentStyle}
        labels={({ index }) => `#${index}`}
        labelPosition={({ index }) => (index ? undefined : "startAngle")}
      />
    </>
  );
};

export const Tooltips = () => {
  return (
    <>
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={["one", "two", "three labels", "four"]}
        labelPlacement="perpendicular"
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="startAngle"
        labelPlacement="perpendicular"
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="endAngle"
        labelPlacement="parallel"
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPlacement="parallel"
        labelPosition={({ index }) => (index ? undefined : "startAngle")}
        labelComponent={<VictoryTooltip active />}
      />
    </>
  );
};

export const LabelRadius = () => {
  return (
    <>
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={100}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.y}
        radius={80}
        innerRadius={100}
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150 },
          { x: 4, y: 120 },
          { x: 5, y: 130 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.r}
        innerRadius={100}
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150, r: 80 },
          { x: 4, y: 120 },
          { x: 5, y: 130 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.r}
        innerRadius={100}
        labelPosition="startAngle"
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150, r: 80 },
          { x: 4, y: 120 },
          { x: 5, y: 130 },
        ]}
      />
    </>
  );
};

export const Styles = () => {
  return (
    <>
      <VictoryPie
        style={{
          ...parentStyle,
          labels: { fontSize: 20 },
          data: {
            stroke: "red",
            strokeWidth: 3,
            fillOpacity: 0.3,
          },
        }}
      />
      <VictoryPie
        colorScale="cool"
        style={{
          ...parentStyle,
          labels: { fontSize: 20 },
          data: {
            fillOpacity: 0.3,
          },
        }}
      />
      <VictoryPie
        style={{
          ...parentStyle,
          labels: {
            fontSize: ({ index }) => (index === 4 ? 25 : 15),
          },
          data: {
            stroke: ({ index }) => (index === 4 ? "red" : undefined),
            strokeWidth: 3,
          },
        }}
      />
      <VictoryPie
        style={{
          ...parentStyle,
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
  );
};

export const StartAndEndAngles = () => {
  return (
    <>
      <VictoryPie style={parentStyle} endAngle={90} startAngle={-90} />
      <VictoryPie
        style={parentStyle}
        endAngle={90}
        innerRadius={140}
        padAngle={5}
        startAngle={-90}
      />
      <VictoryPie
        style={parentStyle}
        dataComponent={
          <Slice
            sliceStartAngle={0}
            sliceEndAngle={({ datum }) => datum.endAngle}
          />
        }
        labels={() => null}
        cornerRadius={5}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.innerRadius}
        data={[
          { x: "Cat", y: 62, innerRadius: 0, radius: 30 },
          { x: "Dog", y: 91, innerRadius: 35, radius: 65 },
          { x: "Fish", y: 55, innerRadius: 70, radius: 100 },
          { x: "Bird", y: 55, innerRadius: 105, radius: 135, endAngle: 360 },
        ]}
      />
      <VictoryPie
        style={parentStyle}
        dataComponent={
          <Slice
            sliceStartAngle={-90}
            sliceEndAngle={({ slice }) =>
              Helpers.radiansToDegrees(slice.endAngle) - 90
            }
          />
        }
        labels={() => null}
        cornerRadius={5}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.innerRadius}
        data={[
          { x: "Cat", y: 62, innerRadius: 0, radius: 30 },
          { x: "Dog", y: 91, innerRadius: 35, radius: 65 },
          { x: "Fish", y: 55, innerRadius: 70, radius: 100 },
          { x: "Bird", y: 55, innerRadius: 105, radius: 135 },
        ]}
      />
    </>
  );
};

export const Origin = () => {
  return (
    <>
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        origin={{ x: 150, y: 150 }}
        labelRadius={100}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        origin={{ x: 150, y: 150 }}
        labelRadius={100}
        endAngle={90}
        startAngle={-90}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        origin={{ y: 0 }}
        labelRadius={100}
        startAngle={-270}
        endAngle={-90}
      />
    </>
  );
};

export const LabelPlacement = () => {
  return (
    <>
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        labelPosition="startAngle"
        labelPlacement="parallel"
        labelRadius={50}
        labels={({ datum }) => `${datum.l} degrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        labelPlacement={({ index }) => (index ? "parallel" : "perpendicular")}
        labelRadius={({ index }) => (index ? 50 : undefined)}
        labels={({ datum }) => `${datum.l} degrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        radius={120}
        labelPosition="startAngle"
        labelPlacement="perpendicular"
        labels={({ datum }) => `${datum.l}\ndegrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        radius={120}
        labelPosition="startAngle"
        labelPlacement="perpendicular"
        labelComponent={<VictoryTooltip active />}
        labels={({ datum }) => `${datum.l}\ndegrees`}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        radius={120}
        labelPlacement={"curved"}
        labels={({ datum }) => `${datum.l} deg`}
        labelRadius={100}
        startOffset={20}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        radius={100}
        labelPlacement="curved"
        labels={({ datum }) => `${datum.l} deg`}
        labelRadius={120}
        startOffset={10}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        radius={100}
        labelPlacement="curved"
        labels={({ datum }) => `${datum.l}`}
        labelRadius={85}
        startOffset={30}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
      <VictoryPie
        style={{ ...parentStyle, labels: { fill: "magenta" } }}
        radius={100}
        labelPlacement="curved"
        labels={({ datum }) => `${datum.l}`}
        labelRadius={85}
        startOffset={30}
        curvedLabelComponent={<CurvedLabel style={{ fill: "red" }} />}
        data={[
          { x: 1, y: 1, l: 0 },
          { x: 2, y: 1, l: 45 },
          { x: 3, y: 1, l: 90 },
          { x: 4, y: 1, l: 135 },
          { x: 5, y: 1, l: 180 },
          { x: 6, y: 1, l: 225 },
          { x: 7, y: 1, l: 270 },
          { x: 8, y: 1, l: 315 },
        ]}
      />
    </>
  );
};

const StyledSlice = styled(Slice)`
  fill: pink;
`;

export const DisableInlineStyles = () => {
  return (
    <>
      <VictoryPie disableInlineStyles style={parentStyle} />
      <VictoryPie
        style={parentStyle}
        dataComponent={<StyledSlice disableInlineStyles />}
      />
    </>
  );
};

export const LabelIndicator = () => {
  return (
    <>
      <VictoryPie style={parentStyle} labelIndicator />

      <VictoryPie
        style={parentStyle}
        labelIndicator
        radius={90}
        labelRadius={100}
        labelIndicatorInnerOffset={25}
        labelIndicatorOuterOffset={4}
      />
      <VictoryPie style={parentStyle} innerRadius={50} labelIndicator />
      <VictoryPie
        style={parentStyle}
        innerRadius={50}
        labelIndicator
        labelIndicatorInnerOffset={25}
        labelIndicatorOuterOffset={10}
      />
      <VictoryPie
        style={parentStyle}
        innerRadius={50}
        labelIndicator={<LineSegment />}
      />
      <VictoryPie
        style={parentStyle}
        labelRadius={90}
        innerRadius={50}
        radius={75}
        labelIndicator={
          <LineSegment
            style={{
              stroke: "red",
              strokeDasharray: 1,
              strokeWidth: 2,
              fill: "none",
            }}
          />
        }
      />
    </>
  );
};
