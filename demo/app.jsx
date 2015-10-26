/*global document:false */
/*global window:false */
import React from "react";
import ReactDOM from "react-dom";
import d3 from "d3";
import _ from "lodash";
import {VictoryChart} from "../src/index";
import {VictoryAxis} from "victory-axis";
import {VictoryBar} from "victory-bar";
import {VictoryLine} from "victory-line";
import {VictoryScatter} from "victory-scatter";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lineData: this.getData(),
      stringData: this.getStringData(),
    };
  }

   getData() {
    return _.map(_.range(20), (i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }

  getStringData() {
    return _.map(_.range(5), () => {
      return [
        {
          x: "apples",
          y: _.random(2, 5)
        },
        {
          x: "bananas",
          y: _.random(2, 10)
        },
        {
          x: "oranges",
          y: _.random(0, 15)
        }
      ];
    });
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        lineData: this.getData(),
        stringData: this.getStringData()
      });
    }, 40000);
  }


  render() {
    return (
      <div className="demo">
        <p>
          <VictoryChart
            style={{width: 500, height: 300, margin: 50}}
          >
            <VictoryAxis axisType="x" orientation="bottom"/>
            <VictoryAxis axisType="y" orientation="left"/>
            <VictoryLine
              data={this.state.lineData}
              animate={{velocity: 0.02}}
              style={{data: {stroke: "red"}}}/>

            <VictoryBar
              data={this.state.lineData}
              animate={{velocity: 0.02}}
              style={{data: {fill: "blue"}}}/>

            <VictoryScatter
              data={this.state.lineData}
              animate={{velocity: 0.02}}
              style={{data: {fill: "gold"}}}/>
          </VictoryChart>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

ReactDOM.render(<App/>, content);
