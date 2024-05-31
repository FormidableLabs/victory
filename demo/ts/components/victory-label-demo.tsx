/* eslint-disable no-magic-numbers*/
import React from "react";
import { VictoryLabel } from "victory-core";
import { VictoryScatter, VictoryScatterProps } from "victory-scatter";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
  labels: { padding: 0 },
  data: { fill: "gold" },
};

const defaultScatterProps: VictoryScatterProps = {
  style,
  width: 400,
  height: 400,
  domain: [-10, 10],
  data: [{ x: 0, y: 0 }],
  labels: () => "Label",
  size: 5,
};
export default class App extends React.Component<any, {}> {
  render() {
    return (
      <div style={containerStyle}>
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={<VictoryLabel />}
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              transform="translate(50)"
              text={"Victory is awesome.\nThis is default anchoring.\nسلام?"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              title={"Victory is awesome. This is a title."}
              desc={"Victory is awesome. This is a description."}
              text={"Victory is awesome.\nThis has a title and description."}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel angle={65} text={"Now with angles!!"} />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              direction="rtl"
              verticalAnchor="start"
              style={[{ fill: "red", fontSize: 20 }]}
              text={"سلام world"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="start"
              style={{ padding: 15 }}
              text={
                "Victory is awesome.\nThis is (middle, start) anchoring.\nGot it?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              dx={30}
              dy={30}
              backgroundStyle={{ fill: "cyan" }}
              text={"such text, wow"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "pink" }}
              style={[{ fontSize: 20, fill: "green" }, { fontSize: 10 }]}
              lineHeight={[1, 3, 1]}
              textAnchor="start"
              verticalAnchor="start"
              text={
                "Victory is awesome.\nThis is (start, start) anchoring.\nCapisce?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "pink" }}
              textAnchor="end"
              verticalAnchor="end"
              text={"Victory is awesome.\nThis is (end, end) anchoring.\nOK?"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "pink" }}
              lineHeight={2}
              textAnchor="middle"
              verticalAnchor="end"
              text={
                "Victory is awesome.\nThis is (middle, end) anchoring.\nGot it?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "pink" }}
              textAnchor="start"
              verticalAnchor="end"
              text={
                "Victory is awesome.\nThis is (start, end) anchoring.\nCapisce?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "pink" }}
              textAnchor="end"
              verticalAnchor="middle"
              text={
                "Victory is awesome.\nThis is (end, middle) anchoring.\nOK?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              lineHeight={2}
              textAnchor="middle"
              verticalAnchor="middle"
              backgroundStyle={{ fill: "cyan", opacity: 0.4 }}
              text={
                "Victory is awesome.\nThis is (middle, middle) anchoring.\nGot it?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              textAnchor="start"
              verticalAnchor="middle"
              text={
                "Victory is awesome.\nThis is (start, middle) anchoring.\nCapisce?"
              }
            />
          }
        />

        {/* examples for inlining VictoryLabel with mutlitple labels */}
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "lavender" }}
              verticalAnchor="middle"
              text={[
                "Victory is awesome.",
                "This is inline styling for labels.",
              ]}
              inline
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "lavender" }}
              textAnchor="start"
              verticalAnchor="middle"
              text={["This is varying styles", "inline."]}
              style={[{ fill: "#000" }, { fill: "#6128ff", fontSize: 20 }]}
              inline
              dx={10}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          data={[{ x: -10, y: 5 }]}
          labelComponent={
            <VictoryLabel
              textAnchor="start"
              verticalAnchor="start"
              backgroundStyle={{ fill: "lavender" }}
              text={["Use", "dx", "attribute", "to", "shift", "labels"]}
              inline
              dx={10}
            />
          }
        />

        {/**
         * example for passing an array of lineHeights.
         * lineHeight prop can accept a number[] or string[].
         */}
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={[
                { fill: "pink" },
                { fill: "blue" },
                { fill: "purple" },
                { fill: "red" },
              ]}
              text={[
                "Victory is awesome.",
                "This is variable",
                "lineHeight",
                "as an array.",
              ]}
              style={[{ fontSize: 20, fill: "green" }, { fontSize: 30 }]}
              lineHeight={[2, 2, 3, 1]}
              verticalAnchor="start"
            />
          }
        />

        {/* example for guarding against empty style and lineHeight arrays */}
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              angle={20}
              backgroundStyle={[{ fill: "pink" }, { fill: "blue" }]}
              text={[
                "Victory is awesome.",
                "Even if we leave blank arrays",
                "for style or lineHeight,",
                "Victory will save us with defaults.",
              ]}
              style={[]}
              lineHeight={[1, 2, 2]}
              verticalAnchor="start"
            />
          }
        />

         {/* example for curved label */}
         <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              startOffset={"10%"}
              labelRadius={90}
              labelPlacement="curved"
              text={[
                "Victory is awesome."
              ]}
              labelStartAngle={0}
              labelEndAngle={180}
              curvedLabelTransform={"translate(200,200)"}
            />
          }
        />
      </div>
    );
  }
}
