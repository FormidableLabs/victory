/*eslint-disable no-magic-numbers*/
import React from "react";
import { VictoryLabel } from "@packages/victory-core";

export default class App extends React.Component<any, {}> {
  render() {
    return (
      <div className="demo">
        <p>
          VictoryLabel demo! The little circles show the anchor points for each
          label.
        </p>
        <svg
          width="600"
          height="2800"
          style={{ border: "1px solid #ccc", padding: 40 }}
        >
          <circle cx="0" cy="0" r="2" fill="red" />
          <VictoryLabel
            transform="translate(50)"
            x={0}
            y={20}
            text={"Victory is awesome.\nThis is default anchoring.\nسلام?"}
          />

          <circle cx="200" cy="50" r="2" fill="red" />
          <VictoryLabel
            x={200}
            y={50}
            title={"Victory is awesome. This is a title."}
            desc={"Victory is awesome. This is a description."}
            text={"Victory is awesome.\nThis has a title and description."}
          />

          <circle cx="0" cy="75" r="2" fill="red" />
          <VictoryLabel x={0} y={75} angle={65} text={"Now with angles!!"} />

          <circle cx="300" cy="150" r="2" fill="pink" />
          <VictoryLabel
            x={300}
            y={150}
            direction="rtl"
            verticalAnchor="start"
            style={[{ fill: "red", fontSize: 20 }]}
            text={"سلام world"}
          />

          <circle cx="300" cy="300" r="2" fill="blue" />
          <VictoryLabel
            x={300}
            y={300}
            textAnchor="middle"
            verticalAnchor="start"
            style={{ padding: 15 }}
            text={
              "Victory is awesome.\nThis is (middle, start) anchoring.\nGot it?"
            }
          />

          <circle cx="150" cy="250" r="2" fill="blue" />
          <VictoryLabel
            x={150}
            y={250}
            dx={30}
            dy={30}
            backgroundStyle={{ fill: "green" }}
            text={"such text, wow"}
          />

          <circle cx="300" cy="450" r="2" fill="red" />
          <VictoryLabel
            backgroundStyle={{ fill: "pink" }}
            style={[{ fontSize: 40, fill: "green" }, { fontSize: 10 }]}
            lineHeight={[1, 3, 1]}
            x={300}
            y={450}
            textAnchor="start"
            verticalAnchor="start"
            text={
              "Victory is awesome.\nThis is (start, start) anchoring.\nCapisce?"
            }
          />

          <circle cx="300" cy="600" r="2" fill="green" />
          <VictoryLabel
            backgroundStyle={{ fill: "pink" }}
            x={300}
            y={600}
            textAnchor="end"
            verticalAnchor="end"
            text={"Victory is awesome.\nThis is (end, end) anchoring.\nOK?"}
          />

          <circle cx="300" cy="750" r="2" fill="blue" />
          <VictoryLabel
            backgroundStyle={{ fill: "pink" }}
            x={300}
            y={750}
            lineHeight={2}
            textAnchor="middle"
            verticalAnchor="end"
            text={
              "Victory is awesome.\nThis is (middle, end) anchoring.\nGot it?"
            }
          />

          <circle cx="300" cy="900" r="2" fill="red" />
          <VictoryLabel
            backgroundStyle={{ fill: "pink" }}
            x={300}
            y={900}
            textAnchor="start"
            verticalAnchor="end"
            text={
              "Victory is awesome.\nThis is (start, end) anchoring.\nCapisce?"
            }
          />

          <circle cx="300" cy="1050" r="2" fill="green" />
          <VictoryLabel
            backgroundStyle={{ fill: "pink" }}
            x={300}
            y={1050}
            textAnchor="end"
            verticalAnchor="middle"
            text={"Victory is awesome.\nThis is (end, middle) anchoring.\nOK?"}
          />

          <circle cx="300" cy="1200" r="2" fill="blue" />
          <VictoryLabel
            x={300}
            y={1200}
            lineHeight={2}
            textAnchor="middle"
            verticalAnchor="middle"
            text={
              "Victory is awesome.\nThis is (middle, middle) anchoring.\nGot it?"
            }
          />

          <circle cx="300" cy="1350" r="2" fill="red" />
          <VictoryLabel
            x={300}
            y={1350}
            textAnchor="start"
            verticalAnchor="middle"
            text={
              "Victory is awesome.\nThis is (start, middle) anchoring.\nCapisce?"
            }
          />

          {/* examples for inlining VictoryLabel with mutlitple labels */}
          <circle cx="300" cy="1500" r="2" fill="red" />
          <VictoryLabel
            x={300}
            y={1500}
            backgroundStyle={{ fill: "lavender" }}
            textAnchor="end"
            verticalAnchor="middle"
            text={["Victory is awesome.", "This is inline styling for labels."]}
            inline
          />

          <circle cx="300" cy="1650" r="2" fill="red" />
          <VictoryLabel
            x={300}
            y={1650}
            backgroundStyle={{ fill: "lavender" }}
            textAnchor="start"
            verticalAnchor="middle"
            text={["This is varying styles", "inline."]}
            style={[{ fill: "#000" }, { fill: "#6128ff", fontSize: 20 }]}
            inline
            dx={25}
          />

          <circle cx="0" cy="1800" r="2" fill="red" />
          <VictoryLabel
            x={0}
            y={1800}
            textAnchor="start"
            verticalAnchor="start"
            backgroundStyle={{ fill: "lavender" }}
            text={[
              "Use",
              "dx",
              "attribute",
              "to",
              "shift",
              "labels",
              "relative to one another."
            ]}
            inline
            dx={10}
          />

          {/**
           * example for passing an array of lineHeights.
           * lineHeight prop can accept a number[] or string[].
           */}
          <circle cx="0" cy="2000" r="2" fill="red" />
          <VictoryLabel
            x={0}
            y={2000}
            backgroundStyle={[
              { fill: "pink" },
              { fill: "blue" },
              { fill: "purple" },
              { fill: "red" }
            ]}
            backgroundPadding={[{ right: -25 }, { right: -80, bottom: -30 }]}
            text={[
              "Victory is awesome.",
              "This is variable",
              "lineHeight",
              "as an array."
            ]}
            style={[{ fontSize: 50, fill: "green" }, { fontSize: 60 }]}
            // eslint-disable-next-line no-magic-numbers
            lineHeight={[2, 2, 3, 1]}
            verticalAnchor="start"
          />

          {/* example for guarding against empty style and lineHeight arrays */}
          <circle cx="300" cy="2300" r="2" fill="red" />
          <VictoryLabel
            angle={20}
            backgroundStyle={[{ fill: "pink" }, { fill: "blue" }]}
            x={300}
            y={2300}
            text={[
              "Victory is awesome.",
              "Even if we leave blank arrays",
              "for style or lineHeight,",
              "Victory will save us with defaults."
            ]}
            style={[]}
            lineHeight={[1, 2, 2]}
            verticalAnchor="start"
          />
        </svg>
      </div>
    );
  }
}
