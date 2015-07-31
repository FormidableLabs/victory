/*global document:false*/
import React from "react";
import Radium from  "radium";
import {VictoryDonut} from "../src/index";
import {VictoryAnimation} from 'victory-animation';

function rand () {
  return Math.floor(Math.random() * 10000000)
}

function getData() {
  return [
    {"age":"<5","population" : rand() },
    {"age":"5-13","population" : rand() },
    {"age":"14-17","population" : rand() },
    {"age":"18-24","population" : rand() },
    {"age":"25-44","population" : rand() },
    {"age":"45-64","population" : rand() },
    {"age":"≥65","population" : rand() }
  ]
}

@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.getStyles = this.getStyles.bind(this);

    this.state = {
      data: this.props.data,
      height: 1000,
      width: 1000
    };

    this.color = d3.scale.ordinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: getData()
      })
    }, 2000);
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
      <VictoryAnimation data={arcData}>
        {(data) => {
          return <g key={index}>
          <path
            d={arc(data)}
            style={styles.path}/>
          <text
            dy=".35em"
            transform={"translate(" + arc.centroid(data) + ")"}
            style={styles.text}>
            {slice.age}
          </text>
        </g>
        }}
      </VictoryAnimation>

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
            data={this.state.data}/>
      </svg>
    );
  }
}

const content = document.getElementById("content");

/* go get the example data */

React.render(<App data={getData()}/>, content);
