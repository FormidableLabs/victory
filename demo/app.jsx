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

const chartStyle = {parent: {width: 500, height: 350, margin: 50}};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData(),
      lineData: this.getData(),
      numericBarData: this.getNumericBarData(),
      barData: this.getBarData(),
      lineStyle: this.getStyles()
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
        lineStyle: this.getStyles()
      });
    }, 4000);
  }


  render() {
    return (
      <div className="demo">
        <p>

          <VictoryChart style={chartStyle}>
            <VictoryLine
              data={this.state.lineData}
              style={{data: this.state.lineStyle}}
              animate={{velocity: 0.02}}/>
          </VictoryChart>

          <VictoryChart style={chartStyle}
            scale={{
              x: d3.time.scale(),
              y: d3.scale.linear()
            }}>
            <VictoryAxis independentAxis
              orientation="bottom"
              tickValues={[
                new Date(1980, 1, 1),
                new Date(1990, 1, 1),
                new Date(2000, 1, 1),
                new Date(2010, 1, 1),
                new Date(2020, 1, 1)
              ]}
              tickFormat={d3.time.format("%Y")}/>
            <VictoryLine
              data={[
                {x: new Date(1982, 1, 1), y: 125},
                {x: new Date(1987, 1, 1), y: 257},
                {x: new Date(1993, 1, 1), y: 345},
                {x: new Date(1997, 1, 1), y: 515},
                {x: new Date(2001, 1, 1), y: 132},
                {x: new Date(2005, 1, 1), y: 305},
                {x: new Date(2011, 1, 1), y: 270},
                {x: new Date(2015, 1, 1), y: 470}
              ]}/>
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            animate={{velocity: 0.02}}>
            <VictoryAxis independentAxis orientation="bottom"/>
            <VictoryAxis orientation="left"/>
            <VictoryLine
              data={this.state.lineData}
              style={{data: {stroke: "red"}}}/>

            <VictoryBar
              data={this.state.lineData}
              style={{data: {fill: "blue"}}}/>

            <VictoryScatter
              data={this.state.lineData}
              style={{data: {fill: "gold"}}}/>
          </VictoryChart>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

ReactDOM.render(<App/>, content);
