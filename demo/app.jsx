/*global document:false */
/*global window:false */
import React from "react";
import d3 from "d3";
import _ from "lodash";
import {VictoryChart} from "../src/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData(),
      lineData: this.getData(),
      numericBarData: this.getNumericBarData(),
      barData: this.getBarData(),
      dataAttributes: {
        stroke: "blue",
        strokeWidth: 2
      }
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

  getNumericBarData() {
    return _.map(_.range(5), () => {
      return [
        {
          x: _.random(1, 3),
          y: _.random(1, 5)
        },
        {
          x: _.random(4, 7),
          y: _.random(1, 10)
        },
        {
          x: _.random(9, 11),
          y: _.random(1, 15)
        }
      ];
    });
  }

  getBarData() {
    return _.map(_.range(5), () => {
      return [
        {
          x: "apples",
          y: _.random(1, 5)
        },
        {
          x: "bananas",
          y: _.random(1, 10)
        },
        {
          x: "oranges",
          y: _.random(1, 15)
        }
      ];
    });
  }

  getScatterData() {
    const colors =
      ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
    const symbols = ["circle", "star", "square", "triangleUp", "triangleDown", "diamond", "plus"];
    return _.map(_.range(20), (index) => {
      const scaledIndex = _.floor(index % 7);
      return {
        x: _.random(20),
        y: _.random(20),
        size: _.random(8) + 3,
        symbol: symbols[scaledIndex],
        fill: colors[_.random(0, 6)],
        opacity: _.random(0.3, 1)
      };
    });
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[_.random(0, 5)],
      strokeWidth: [_.random(1, 3)]
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData(),
        lineData: this.getData(),
        barData: this.getBarData(),
        numericBarData: this.getNumericBarData(),
        dataAttributes: this.getStyles()
      });
    }, 4000);
  }

  render() {
    return (
      <div className="demo">
        <p>


            <VictoryChart
            data={this.state.barData}
            dataAttributes={[
              {type: "stackedBar", fill: "cornflowerblue"},
              {type: "stackedBar", fill: "orange"},
              {type: "stackedBar", fill: "greenyellow"},
              {type: "stackedBar", fill: "gold"},
              {type: "stackedBar", fill: "tomato"}
            ]}
            domainPadding={{
              x: 100,
              y: 0
            }}
            animate={{velocity: 0.02}}/>
          <VictoryChart
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 3},
              {x: 4, y: 2},
              {x: 5, y: 1},
              {x: 6, y: 2},
              {x: 7, y: 3},
              {x: 8, y: 2},
              {x: 9, y: 1},
              {x: 10, y: 2},
              {x: 11, y: 3},
              {x: 12, y: 2},
              {x: 13, y: 1}
            ]}
            tickValues={{
              x: ["12", "13", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
            }}
            style={{
              axis: {
                x: {
                  axis: {stroke: "black", strokeWidth: 2},
                  ticks: {stroke: "transparent"}
                },
                y: {
                  axis: {stroke: "transparent"},
                  ticks: {stroke: "transparent", padding: 15}
                }
              }
            }}
            domainPadding={{
              x: 20,
              y: 10
            }}
            dataAttributes={{type: "bar", fill: "orange"}}
            barWidth={5}
            y={() => 0.5}
            yAttributes={{type: "line", stroke: "gold", strokeWidth: 3}}/>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
