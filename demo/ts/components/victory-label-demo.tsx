import React from "react";
import { VictoryLabel, VictoryTheme } from "victory";
import { VictoryScatter, VictoryScatterProps } from "victory";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
};

const themeColors = VictoryTheme.clean.palette?.colors || {};

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
          theme={VictoryTheme.clean}
          labelComponent={<VictoryLabel />}
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              transform="translate(50)"
              text={"Victory is awesome.\nThis is default anchoring.\nسلام?"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel angle={65} text={"Now with angles!!"} />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              direction="rtl"
              verticalAnchor="start"
              text={"سلام world"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="start"
              text={
                "Victory is awesome.\nThis is (middle, start) anchoring.\nGot it?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              dx={30}
              dy={30}
              backgroundStyle={{ fill: themeColors.yellow, opacity: 0.4 }}
              text={"such text, wow"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.cyan, opacity: 0.4 }}
              style={[
                { fontSize: 20, fill: themeColors.purple },
                { fontSize: 10 },
              ]}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.yellow, opacity: 0.4 }}
              textAnchor="end"
              verticalAnchor="end"
              text={"Victory is awesome.\nThis is (end, end) anchoring.\nOK?"}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.green, opacity: 0.4 }}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.red, opacity: 0.3 }}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.red, opacity: 0.3 }}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              lineHeight={2}
              textAnchor="middle"
              verticalAnchor="middle"
              backgroundStyle={{ fill: themeColors.cyan, opacity: 0.4 }}
              text={
                "Victory is awesome.\nThis is (middle, middle) anchoring.\nGot it?"
              }
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.cyan, opacity: 0.4 }}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.purple, opacity: 0.4 }}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: themeColors.purple, opacity: 0.4 }}
              textAnchor="start"
              verticalAnchor="middle"
              text={["This is varying styles", "inline."]}
              style={[
                { fill: "#FFF" },
                { fill: themeColors.purple, fontSize: 20 },
              ]}
              inline
              dx={10}
            />
          }
        />

        <VictoryScatter
          {...defaultScatterProps}
          theme={VictoryTheme.clean}
          data={[{ x: -10, y: 5 }]}
          labelComponent={
            <VictoryLabel
              textAnchor="start"
              verticalAnchor="start"
              backgroundStyle={{ fill: themeColors.purple, opacity: 0.4 }}
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
          theme={VictoryTheme.clean}
          labelComponent={
            <VictoryLabel
              backgroundStyle={[
                { fill: themeColors.red },
                { fill: themeColors.blue },
                { fill: themeColors.purple },
                { fill: themeColors.red },
              ]}
              text={[
                "Victory is awesome.",
                "This is variable",
                "lineHeight",
                "as an array.",
              ]}
              style={[{ fontSize: 20, fill: "#FFF" }, { fontSize: 30 }]}
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
              backgroundStyle={[
                { fill: themeColors.red },
                { fill: themeColors.blue },
              ]}
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
      </div>
    );
  }
}
