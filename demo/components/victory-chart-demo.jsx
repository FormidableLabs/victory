/*global window:false */
import React from "react";
import _ from "lodash";
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryScatter
} from "../../src/index";

const UPDATE_INTERVAL = 2000;
let updateTimer;

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
    updateTimer = window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData(),
        lineData: this.getData(),
        barData: this.getBarData(),
        numericBarData: this.getNumericBarData(),
        lineStyle: this.getStyles()
      });
    }, UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    window.clearInterval(updateTimer);
  }

  render() {
    return (
      <div className="demo">
        <p>
          <VictoryChart/>

          <VictoryChart height={500} width={200}>
            <VictoryScatter/>
          </VictoryChart>

          <VictoryChart>
            <VictoryLine/>
          </VictoryChart>

          <VictoryChart>
            <VictoryBar/>
          </VictoryChart>

          <VictoryChart scale={"linear"}>
            <VictoryLine
              style={{data:
                {stroke: "red", strokeWidth: 4}
              }}
              y={(data) => Math.sin(2 * Math.PI * data.x)}
            />
            <VictoryLine
              style={{data:
                {stroke: "blue", strokeWidth: 4}
              }}
              y={(data) => Math.cos(2 * Math.PI * data.x)}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle} animate={{velocity: 0.02}}>
            <VictoryAxis dependentAxis orientation="left" style={{grid: {strokeWidth: 1}}}/>
            <VictoryLine
              data={this.state.lineData}
              style={{data: this.state.lineStyle}}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle}
            scale={{
              x: "time"
            }}
          >
            <VictoryAxis
              orientation="bottom"
              tickValues={[
                new Date(1980, 1, 1),
                new Date(1990, 1, 1),
                new Date(2000, 1, 1),
                new Date(2010, 1, 1),
                new Date(2020, 1, 1)
              ]}
              tickFormat={(x) => x.getFullYear()}
            />
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
              ]}
            />
          </VictoryChart>

          <VictoryChart animate={{velocity: 0.02}}>
            <VictoryScatter data={this.state.scatterData}/>
            <VictoryLine y={(data) => data.x}/>
          </VictoryChart>

          <VictoryChart>
            <VictoryAxis dependentAxis orientation="right"/>
            <VictoryAxis orientation="top"/>
            <VictoryLine y={(d) => 0.5 * d.x + 0.5} style={{data: {stroke: "red"}}}/>
            <VictoryScatter y={(d) => d.x * d.x} style={{data: {stroke: "red"}}}/>
          </VictoryChart>

          <VictoryChart animate={{velocity: 0.02}} domainPadding={{x: 20}}>
            <VictoryAxis orientation="top"/>
            <VictoryBar
              data={this.state.numericBarData}
              dataAttributes={[
                {fill: "cornflowerblue"},
                {fill: "orange"},
                {fill: "greenyellow"},
                {fill: "gold"},
                {fill: "tomato"}
              ]}
              categories={[[1, 3], [4, 7], [9, 11]]}
            />
          </VictoryChart>

          <VictoryChart animate={{velocity: 0.02}}
            domainPadding={{x: 100}}
          >
            <VictoryAxis
              tickValues={["apples", "bananas", "oranges"]}
              tickFormat={() => ""}
            />
            <VictoryBar stacked
              data={this.state.barData}
              dataAttributes={[
                {fill: "cornflowerblue"},
                {fill: "greenyellow"},
                {fill: "gold"},
                {fill: "orange"},
                {fill: "tomato"}
              ]}
              labels={["apples\n(fuji)", "bananas", "oranges\n(navel)"]}
            />
          </VictoryChart>

          <VictoryChart domainPadding={{x: 30, y: 30}}>
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
              tickFormat={(x) => `${x}\ntick`}
              style={{
                axis: {stroke: "black", strokeWidth: 2},
                ticks: {stroke: "transparent"},
                tickLabels: {fill: "black"}
              }}
            />
            <VictoryAxis label="y axis" dependentAxis
              tickValues={[0, 1.5, 3, 4.5]}
              style={{
                grid: {strokeWidth: 1},
                axis: {stroke: "transparent"},
                ticks: {stroke: "transparent", padding: 15}
              }}
            />
            <VictoryBar style={{data: {width: 15, fill: "orange"}}}
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
            />
            <VictoryLine y={() => 0.5}
              style={{data: {stroke: "gold", strokeWidth: 3}}}
              label="LINE"
            />
          </VictoryChart>
        </p>
      </div>
    );
  }
}

export default App;
