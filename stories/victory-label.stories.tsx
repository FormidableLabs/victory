import { Meta } from "@storybook/react";
import React from "react";

import {
  VictoryScatter,
  VictoryScatterProps,
} from "../packages/victory-scatter";
import { VictoryLabel } from "../packages/victory-core";
import { storyContainer } from "./decorators";

const meta: Meta<typeof VictoryLabel> = {
  title: "Victory Charts/SVG Container/VictoryLabel",
  component: VictoryLabel,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
  labels: { padding: 0, fontFamily: "arial" },
  data: { fill: "gold" },
};

const defaultScatterProps: VictoryScatterProps = {
  style,
  width: 300,
  height: 300,
  domain: [-10, 10],
  data: [{ x: 0, y: 0 }],
  labels: () => "Label",
  size: 5,
};

export const DefaultRendering = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel />}
      />
    </>
  );
};

export const Positioning = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel x={100} text="x = 100" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel y={100} text="y = 100" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel dx={50} text="dx = 50" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel dy={50} text="dy = 50" />}
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel dx={({ datum }) => datum.x + 50} text="dx function" />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel dy={({ datum }) => datum.x - 20} text="dy function" />
        }
      />
    </>
  );
};

export const Anchors = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="end"
            verticalAnchor="end"
            text={["textAnchor: end", "with", "verticalAnchor: end"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="end"
            verticalAnchor="middle"
            text={["textAnchor: end", "with", "verticalAnchor: middle"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="end"
            verticalAnchor="start"
            text={["textAnchor: end", "with", "verticalAnchor: start"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="end"
            text={["textAnchor: middle", "with", "verticalAnchor: end"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            text={["textAnchor: middle", "with", "verticalAnchor: middle"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="start"
            text={["textAnchor: middle", "with", "verticalAnchor: start"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="start"
            verticalAnchor="end"
            text={["textAnchor: start", "with", "verticalAnchor: end"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="start"
            verticalAnchor="middle"
            text={["textAnchor: start", "with", "verticalAnchor: middle"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            textAnchor="end"
            verticalAnchor="start"
            text={["textAnchor: end", "with", "verticalAnchor: start"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
    </>
  );
};

export const Styles = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
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
  );
};

export const LineHeight = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={2}
            text={["single", "lineHeight", "value"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={[2]}
            text={["single array", "lineHeight", "value"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={[2, 1, 3]}
            text={["multi array", "lineHeight", "value"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={2}
            text={["single", "lineHeight", "value"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={[2]}
            text={["single array", "lineHeight", "value"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={[2, 1, 3]}
            text={["multi array", "lineHeight", "value"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={[2, 1, 3]}
            text={["测试汉字", "不在正常的 ASCII 范围内", "最后一行"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            lineHeight={[2, 1, 3]}
            text={[
              "اختبار اللغات التي تُقرأ من اليمين إلى اليسار",
              "مثل العربية",
              "هناك أكثر من ذلك بكثير",
            ]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
    </>
  );
};

export const Angles = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={45}
            verticalAnchor="middle"
            text={["middle", "middle", "anchors"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={45}
            textAnchor="start"
            text={["start", "end", "anchors"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={45}
            textAnchor="end"
            verticalAnchor="start"
            text={["end", "start", "anchors"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={-45}
            verticalAnchor="middle"
            text={["middle", "middle", "anchors"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={-45}
            textAnchor="start"
            text={["start", "end", "anchors"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={-45}
            textAnchor="end"
            verticalAnchor="start"
            text={["end", "start", "anchors"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
    </>
  );
};

export const BackgroundStyles = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "Even if we leave blank arrays",
              "for style or lineHeight,",
              "Victory will save us with defaults.",
            ]}
            lineHeight={[]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgrounds work with ",
              "multiple lineHeights,",
              "but the positioning does change",
            ]}
            lineHeight={[1, 2, 1, 3]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={70}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "background rects",
              "all get appropriate",
              "angle transforms",
            ]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            dy={({ datum }) => (datum.y > 0 ? -5 : 8)}
            verticalAnchor="end"
            backgroundPadding={{ top: 5, right: 5, bottom: 5, left: 5 }}
            backgroundStyle={{ fill: "plum", stroke: "#000000" }}
            text={[
              "Victory is awesome.",
              "background styles",
              "work with dy functions",
            ]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            dx={({ datum }) => (datum.y > 0 ? -5 : 8)}
            verticalAnchor="end"
            backgroundPadding={{ top: 5, right: 5, bottom: 5, left: 5 }}
            backgroundStyle={{ fill: "thistle", stroke: "#000000" }}
            text={[
              "Victory is awesome.",
              "background styles",
              "work with dx functions",
            ]}
          />
        }
      />
    </>
  );
};
export const Inline = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            backgroundStyle={{ fill: "lavender" }}
            verticalAnchor="middle"
            text={["Victory is awesome.", "This is inline styling for labels."]}
            inline
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            inline
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgrounds work with ",
              "multiple lineHeights,",
              "but the positioning does change",
            ]}
            lineHeight={[1, 2, 1, 3]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            inline
            angle={70}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "background rects",
              "all get appropriate",
              "angle transforms",
            ]}
          />
        }
      />
    </>
  );
};

export const BackgroundPadding = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as a number",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={10}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an object",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={{ top: 0, bottom: 10, left: 20, right: -10 }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an array",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={[
              { top: 0, bottom: 10, left: 20, right: -10 },
              -5,
              { top: 0, bottom: 10, left: 40, right: -30 },
              20,
            ]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={45}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as a number",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={10}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={45}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an object",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={{ top: 0, bottom: 10, left: 20, right: -10 }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            angle={45}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "lavender" },
              { fill: "thistle" },
              { fill: "plum" },
            ]}
            text={[
              "Victory is awesome.",
              "backgroundPadding as an array",
              "applies to all lines",
              "but alters positioning",
            ]}
            backgroundPadding={[
              { top: 0, bottom: 10, left: 20, right: -10 },
              -5,
              { top: 0, bottom: 10, left: 40, right: -30 },
              20,
            ]}
          />
        }
      />
    </>
  );
};

export const LabelPlacement = () => {
  return (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            curvedLabelTransform={"translate(150,150)"}
            labelPlacement="curved"
            startOffset={50}
            labelRadius={90}
            text={["Victory is awesome."]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            curvedLabelTransform={"translate(150,150)"}
            labelPlacement="curved"
            startOffset={50}
            labelRadius={90}
            labelStartAngle={0}
            labelEndAngle={90}
            text={["Victory is awesome."]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel
            curvedLabelTransform={"translate(150,150)"}
            labelPlacement="curved"
            startOffset={50}
            labelRadius={90}
            labelStartAngle={180}
            labelEndAngle={110}
            text={["Victory is awesome."]}
          />
        }
      />
    </>
  );
};
