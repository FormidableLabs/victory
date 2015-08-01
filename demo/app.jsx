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
      ["#D85F49", "#F66D3B", "#D92E1D", "#D73C4C", "#FFAF59", "#E28300", "#F6A57F"];
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
      height: this.state.height,
      margin: "0 auto",
      width: this.state.width
    };
  }

  render() {
    return (
      <div style={this.getStyles()}>
        <VictoryDonut
          height={this.state.height}
          width={this.state.width}
          data={this.state.data}
          sliceColors={this.sliceColors}/>
      </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.array
};

const content = document.getElementById("content");
React.render(<App data={getData()}/>, content);
