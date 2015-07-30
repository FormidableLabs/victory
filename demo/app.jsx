/*global document:false*/
import React from "react";
import Radium from  "radium";
import {VictoryDonut} from "../src/index";

@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.getStyles = this.getStyles.bind(this);

    this.state = {
      height: 1000,
      width: 1000
    };

    this.color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  }

  getStyles(age) {
    return {
      text: {
        fontFamily: "Helvetica",
        fontSize: "10px",
        textAnchor: "middle"
      },
      path: {
        fill: this.color(age) || "#ccc",
        stroke: "#fff",
        strokeWidth: ".4px"
      },
      svg: {
        border: "1px solid #ccc",
        margin: "20px"
      }
    };
  }

  slice(slice, arc, radius, arcData, index) {
    const styles = this.getStyles(slice.age);

    return (
      <g key={index}>
        <path
          d={arc(arcData)}
          style={styles.path}/>
        <text
          dy=".35em"
          transform={"translate(" + arc.centroid(arcData) + ")"}
          style={styles.text}>
          {slice.age}
        </text>
      </g>
    );
  }

  render() {
    const styles = this.getStyles();

    return (
      <svg
        style={styles.svg}
        width={this.state.width}
        height={this.state.height}>
          <VictoryDonut
            height={this.state.height}
            width={this.state.width}
            slice={this.slice.bind(this)}
            data={this.props.data}/>
      </svg>
    );
  }
}

const content = document.getElementById("content");

/* go get the example data */

d3.csv("https://rawgit.com/mbostock/3887193/raw/98e6eebc502876a73ae177c0e4073ae0b5f6effe/data.csv", function(error, csv) {
  if (error) {
    return console.warn(error);
  }
  React.render(<App data={csv}/>, content);
});
