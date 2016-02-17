import React from "react";
import {VictoryLabel} from "../src/index";

export default class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <p>
          VictoryLabel demo! The little circles show the anchor points for
          each label.
        </p>
        <svg width="600" height="1800" style={{ border: "1px solid #ccc", padding: 40}}>

          <circle cx="0" cy="0" r="2" fill="red"/>
          <VictoryLabel x={0} y={0}>
            {"Victory is awesome.\nThis is default anchoring.\nCapisce?"}
          </VictoryLabel>

          <circle cx="300" cy="150" r="2" fill="green"/>
          <VictoryLabel x={300} y={150} textAnchor="end" verticalAnchor="start"
            style={{ fill: "blue" }}
          >
            {"Victory is awesome.\nThis is (end, start) anchoring.\nOK?"}
          </VictoryLabel>

          <circle cx="300" cy="300" r="2" fill="blue"/>
          <VictoryLabel x={300} y={300} lineHeight={2} textAnchor="middle" verticalAnchor="start">
            {"Victory is awesome.\nThis is (middle, start) anchoring.\nGot it?"}
          </VictoryLabel>

          <circle cx="300" cy="450" r="2" fill="red"/>
          <VictoryLabel x={300} y={450} textAnchor="start" verticalAnchor="start">
            {"Victory is awesome.\nThis is (start, start) anchoring.\nCapisce?"}
          </VictoryLabel>

          <circle cx="300" cy="600" r="2" fill="green"/>
          <VictoryLabel x={300} y={600} textAnchor="end" verticalAnchor="end">
            {"Victory is awesome.\nThis is (end, end) anchoring.\nOK?"}
          </VictoryLabel>

          <circle cx="300" cy="750" r="2" fill="blue"/>
          <VictoryLabel x={300} y={750} lineHeight={2}
            textAnchor="middle" verticalAnchor="end"
          >
            {"Victory is awesome.\nThis is (middle, end) anchoring.\nGot it?"}
          </VictoryLabel>

          <circle cx="300" cy="900" r="2" fill="red"/>
          <VictoryLabel x={300} y={900} textAnchor="start" verticalAnchor="end">
            {"Victory is awesome.\nThis is (start, end) anchoring.\nCapisce?"}
          </VictoryLabel>

          <circle cx="300" cy="1050" r="2" fill="green"/>
          <VictoryLabel x={300} y={1050} textAnchor="end" verticalAnchor="middle">
            {"Victory is awesome.\nThis is (end, middle) anchoring.\nOK?"}
          </VictoryLabel>

          <circle cx="300" cy="1200" r="2" fill="blue"/>
          <VictoryLabel x={300} y={1200} lineHeight={2}
            textAnchor="middle" verticalAnchor="middle"
          >
            {"Victory is awesome.\nThis is (middle, middle) anchoring.\nGot it?"}
          </VictoryLabel>

          <circle cx="300" cy="1350" r="2" fill="red"/>
          <VictoryLabel x={300} y={1350} textAnchor="start" verticalAnchor="middle">
            {"Victory is awesome.\nThis is (start, middle) anchoring.\nCapisce?"}
          </VictoryLabel>

        </svg>
      </div>
    );
  }
}
