/*global window:false */
import React from "react";
import _ from "lodash";
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryArea,
  VictoryScatter, VictoryStack, VictoryGroup
} from "../../src/index";


const UPDATE_INTERVAL = 3000;
let scatterDataToggle = false;


const chartStyle = {parent: {width: 500, height: 350, margin: 50}};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData(),
      lineData: this.getData(),
      numericBarData: this.getNumericBarData(),
      barData: this.getBarData(),
      barTransitionData: this.getBarTransitionData(),
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

  getBarTransitionData() {
    const bars = _.random(6, 10);
    return _.map(_.range(bars), (bar) => {
      return {x: bar, y: _.random(2, 10)}
    })
  }

  getScatterData() {
    const colors =
      ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
    const symbols = ["circle", "star", "square", "triangleUp", "triangleDown", "diamond", "plus"];
    const elementNum = (scatterDataToggle = !scatterDataToggle) ? 10 : 40;
    return _.map(_.range(elementNum), (index) => {
      const scaledIndex = _.floor(index % 7);
      return {
        x: _.random(!scatterDataToggle ? 50 : 10) - (!scatterDataToggle ? 25 : 5),
        y: _.random(!scatterDataToggle ? 50 : 10),
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

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData(),
        lineData: this.getData(),
        barData: this.getBarData(),
        barTransitionData: this.getBarTransitionData(),
        numericBarData: this.getNumericBarData(),
        lineStyle: this.getStyles()
      });
    }, UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    return (
      <div className="demo">
        <h1>VictoryChart</h1>
        <p>


          <VictoryChart animate={{ duration: 600 }}>
            <VictoryBar
              data={this.state.barTransitionData}
              animate={{
                onExit: {
                  duration: 500,
                  before: (datum) => ({ y: datum.y}),
                  after: () => ({y: 0})
                }
              }}
            />
          </VictoryChart>


        </p>
      </div>
    );
  }
}

export default App;
