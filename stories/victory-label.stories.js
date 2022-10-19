/* eslint-disable no-magic-numbers*/
/* eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryScatter } from "victory-scatter";
import { VictoryLabel } from "victory-core";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
  labels: { padding: 0, fontFamily: "arial" },
  data: { fill: "gold" },
};

const defaultScatterProps = {
  style,
  width: 300,
  height: 300,
  domain: [-10, 10],
  data: [{ x: 0, y: 0 }],
  labels: () => "Label",
  size: 5,
};

export default {
  title: "VictoryLabel",
  component: VictoryLabel,
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={<VictoryLabel />}
      />
    </div>
  );
};

export const Positioning = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Anchors = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Styles = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const LineHeight = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const Angles = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const BackgroundStyles = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};
export const Inline = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};

export const BackgroundPadding = () => {
  return (
    <div style={containerStyle}>
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
    </div>
  );
};
