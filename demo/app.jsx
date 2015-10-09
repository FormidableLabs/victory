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
          x: "oranges",
          y: _.random(1, 10)
        },
        {
          x: "bananas",
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
        color: colors[_.random(0, 6)],
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
            data={this.state.lineData}
            showGridLines={{x: false, y: true}}
            animate={true}/>

          <VictoryChart interpolation="linear"
            scale={{
              x: () => d3.time.scale(),
              y: () => d3.scale.linear()
            }}
            tickValues={{
              x: [
                new Date(1980, 1, 1),
                new Date(1990, 1, 1),
                new Date(2000, 1, 1),
                new Date(2010, 1, 1),
                new Date(2020, 1, 1)
              ],
              y: [100, 200, 300, 400, 500]
            }}
            tickFormat={{
              x: () => d3.time.format("%Y"),
              y: () => d3.scale.linear().tickFormat()
            }}
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

          <VictoryChart
            data={this.state.scatterData}
            animate={true}
            dataAttributes={{type: "scatter"}}
            y={(x) => x}/>

          <VictoryChart
            showGridLines={{x: true, y: true}}
            samples={20}
            axisOrientation={{x: "top", y: "right"}}
            y={[
              (x) => 0.5 * x + 0.5,
              (x) => x * x
            ]}
            yAttributes={[
              {stroke: "red"},
              {type: "scatter"}
            ]}/>

          <VictoryChart
            showGridLines={{x: true, y: true}}
            axisLabels={{x: "x axis", y: "y axis"}}
            x={[
              [1, 2, 3, 4],
              [-2, -1, 0, 1, 3],
              [3, 4, 6]
            ]}
            y={[
            [1, 2, 10, 4],
            (x) => x * x,
            [-5, -4, -3, -2, 2, 3]
          ]}
          yAttributes={[
            {name: "line-one", type: "scatter", color: "red", symbol: "triangleUp"},
            {name: "line-two", type: "line", stroke: "green"},
            {name: "line-3", type: "scatter", color: "blue"}
          ]}/>

          <VictoryChart
            data={this.state.numericBarData}
            dataAttributes={[
              {type: "bar", color: "cornflowerblue"},
              {type: "bar", color: "orange"},
              {type: "bar", color: "greenyellow"},
              {type: "bar", color: "gold"},
              {type: "bar", color: "tomato"}
            ]}
            axisOrientation={{x: "top", y: "right"}}
            barCategories={[[1, 3], [4, 7], [9, 11]]}
            domainOffset={{
              x: 20,
              y: 0
            }}
            animate={true}/>

            <VictoryChart
            data={this.state.barData}
            dataAttributes={[
              {type: "stackedBar", color: "cornflowerblue"},
              {type: "stackedBar", color: "orange"},
              {type: "stackedBar", color: "greenyellow"},
              {type: "stackedBar", color: "gold"},
              {type: "stackedBar", color: "tomato"}
            ]}
            domainOffset={{
              x: 100,
              y: 0
            }}
            animate={true}/>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
