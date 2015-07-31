/*global document:false window:false*/
import React from "react";
import Radium from "radium";
import {VictoryDonut} from "../src/index";

const rand = function () {
  return Math.max(Math.floor(Math.random() * 10000), 1000);
};

const getData = function () {
  return [
    { x: "<5", y: rand() },
    { x: "5-13", y: rand() },
    { x: "14-17", y: rand() },
    { x: "18-24", y: rand() },
    { x: "25-44", y: rand() },
    { x: "45-64", y: rand() },
    { x: "≥65", y: rand() }
  ];
};

@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      height: 500,
      width: 500
    };

    this.sliceColors =
      ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData()
      });
    }, 2000);
  }

  getStyles() {
    return {
      border: "1px solid #ccc",
      margin: "20px"
    };
  }

  render() {
    return (
      <svg
        style={this.getStyles()}
        width={this.state.width}
        height={this.state.height}>
          <VictoryDonut
            height={this.state.height}
            width={this.state.width}
            data={this.state.data}
            sliceColors={this.sliceColors}/>
      </svg>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.array
};

const content = document.getElementById("content");
React.render(<App data={getData()}/>, content);
