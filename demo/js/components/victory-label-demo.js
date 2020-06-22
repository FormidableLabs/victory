/*eslint-disable no-magic-numbers*/
import React from "react";
import { VictoryScatter } from "Packages/victory-scatter/src/index";
import { VictoryLabel } from "Packages/victory-core/src/index";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
  labels: { padding: 0 },
  data: { fill: "gold" }
};

const defaultScatterProps = {
  style,
  width: 400,
  height: 400,
  domain: [-10, 10],
  data: [{ x: 0, y: 0 }],
  labels: () => "Label",
  size: 5
};

export default class App extends React.Component {
  render() {
    return (
      <div style={containerStyle}>
        <VictoryScatter {...defaultScatterProps} labelComponent={<VictoryLabel />} />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              transform="translate(50)"
              text={"translate 50\nwith default anchoring.\nسلام?"}
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
          labelComponent={<VictoryLabel angle={65} text={"Now with angles!!"} />}
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
              text={"Victory is awesome.\nThis is (middle, start) anchoring.\nGot it?"}
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
              verticalAnchor="end"
              text={"Victory is awesome.\nThis is (start, start) anchoring.\nCapisce?"}
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              style={[{ fontSize: 20, fill: "green" }, { fontSize: 10 }]}
              lineHeight={[1, 3, 1]}
              textAnchor="start"
              verticalAnchor="end"
              text={"Victory is awesome.\nThis is (start, start) anchoring.\nCapisce?"}
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
              text={"Victory is awesome.\nThis is (middle, end) anchoring.\nGot it?"}
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
              text={"Victory is awesome.\nThis is (start, end) anchoring.\nCapisce?"}
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
              text={"Victory is awesome.\nThis is (end, middle) anchoring.\nOK?"}
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
              text={"Victory is awesome.\nThis is (middle, middle) anchoring.\nGot it?"}
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              textAnchor="start"
              verticalAnchor="middle"
              text={"Victory is awesome.\nThis is (start, middle) anchoring.\nCapisce?"}
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          data={[{ x: 0, y: 5 }]}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "lavender" }}
              text={["Victory is awesome.", "This is inline styling for labels."]}
              inline
              verticalAnchor="end"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          data={[{ x: -5, y: 5 }]}
          labelComponent={
            <VictoryLabel
              backgroundStyle={{ fill: "lavender" }}
              textAnchor="start"
              verticalAnchor="middle"
              text={["This is varying styles", "inline."]}
              style={[{ fill: "#000" }, { fill: "#6128ff", fontSize: 20 }]}
              inline
              dx={35}
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
              text={["Use", "dx", "attribute", "to shift", "labels"]}
              inline
              dx={25}
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              backgroundStyle={[
                { fill: "pink", opacity: 0.4 },
                { fill: "blue", opacity: 0.4 },
                { fill: "purple", opacity: 0.4 },
                { fill: "red", opacity: 0.4 }
              ]}
              text={["Victory is awesome.", "This is variable", "lineHeight", "as an array."]}
              style={[{ fontSize: 20, fill: "green" }, { fontSize: 30 }]}
              // eslint-disable-next-line no-magic-numbers
              lineHeight={[2, 2, 3, 1]}
              verticalAnchor="middle"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              angle={20}
              backgroundStyle={[{ fill: "pink", opacity: 0.5 }, { fill: "lavender", opacity: 0.5 }]}
              text={[
                "Victory is awesome.",
                "Victory is awesome.",
                "Victory is awesome.",
                "Victory is awesome."
              ]}
              backgroundPadding={[
                { left: -10 },
                { right: -20 },
                { right: 0 },
                { right: -20, left: -10 }
              ]}
              verticalAnchor="middle"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          data={[{ x: -10, y: 5 }]}
          labelComponent={
            <VictoryLabel
              inline
              dx={20}
              angle={20}
              textAnchor="start"
              backgroundStyle={[
                { fill: "pink", opacity: 0.5 },
                { fill: "orange", opacity: 0.2 },
                { fill: "cyan", opacity: 0.2 }
              ]}
              text={["Victory is awesome. ", "inline labels ", "with multiple backgrounds"]}
              lineHeight={[1, 2, 2]}
              verticalAnchor="start"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          data={[{ x: -10, y: 5 }]}
          labelComponent={
            <VictoryLabel
              angle={20}
              textAnchor="start"
              backgroundStyle={[
                { fill: "pink", opacity: 0.5 },
                { fill: "orange", opacity: 0.2 },
                { fill: "cyan", opacity: 0.2 }
              ]}
              text={["Victory is awesome. ", "inline labels ", "with multiple backgrounds"]}
              verticalAnchor="middle"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          data={[{ x: 10, y: -5 }]}
          labelComponent={
            <VictoryLabel
              inline
              angle={20}
              textAnchor="end"
              backgroundStyle={[
                { fill: "pink", opacity: 0.5 },
                { fill: "orange", opacity: 0.2 },
                { fill: "cyan", opacity: 0.2 }
              ]}
              text={["Victory is awesome!!!! ", "inline labels ", "+ backgrounds"]}
              lineHeight={[1, 2, 2]}
              verticalAnchor="start"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          data={[{ x: 10, y: -5 }]}
          labelComponent={
            <VictoryLabel
              angle={20}
              textAnchor="end"
              backgroundStyle={[
                { fill: "pink", opacity: 0.5 },
                { fill: "orange", opacity: 0.2 },
                { fill: "green", opacity: 0.2 }
              ]}
              text={["Victory is awesome. ", "inline labels ", "with multiple backgrounds"]}
              lineHeight={[1, 2, 2]}
              verticalAnchor="end"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              inline
              angle={20}
              textAnchor="middle"
              backgroundStyle={[
                { fill: "pink", opacity: 0.5 },
                { fill: "orange", opacity: 0.2 },
                { fill: "cyan", opacity: 0.2 }
              ]}
              text={["Victory is awesome. ", "inline labels ", "with multiple backgrounds"]}
              lineHeight={[1, 2, 2]}
              verticalAnchor="start"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              angle={20}
              textAnchor="middle"
              backgroundStyle={[
                { fill: "pink", opacity: 0.5 },
                { fill: "orange", opacity: 0.2 },
                { fill: "cyan", opacity: 0.2 }
              ]}
              text={["Victory is awesome. ", "inline labels ", "with multiple backgrounds"]}
              lineHeight={[1, 2, 2]}
              verticalAnchor="start"
            />
          }
        />
        <VictoryScatter
          {...defaultScatterProps}
          labelComponent={
            <VictoryLabel
              inline
              backgroundStyle={[
                { fill: "pink", opacity: 0.5 },
                { fill: "orange", opacity: 0.2 },
                { fill: "cyan", opacity: 0.2 }
              ]}
              style={[{ letterSpacing: 2, fontSize: 15 }, { fontSize: 20 }, { fontSize: 12 }]}
              text={["Victory is awesome. ", "inline labels ", "with multiple backgrounds"]}
              lineHeight={[1, 2, 2]}
              verticalAnchor="start"
            />
          }
        />
      </div>
    );
  }
}
