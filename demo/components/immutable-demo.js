/*global window:false */
import React from "react";
import PropTypes from "prop-types";
import { random, range } from "lodash";
import { List, Map } from "immutable";
import { VictoryClipContainer } from "victory-core";

import {
  VictoryChart,
  VictoryScatter
} from "../../src/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scatterData: this.getScatterData() };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({ scatterData: this.getScatterData() });
    }, 3000);
  }

  getScatterData() {
    const colors =
      ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
    const symbols = ["circle", "star", "square", "triangleUp", "triangleDown", "diamond", "plus"];
    const elementNum = random(10, 40);
    const rangeList = List(range(elementNum));
    return rangeList.map((index) => {
      const scaledIndex = Math.floor(index % 7);
      return Map({
        x: random(10, 50),
        y: random(2, 100),
        size: random(8) + 3,
        symbol: symbols[scaledIndex],
        fill: colors[random(0, 6)],
        opacity: 1
      });
    });
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = {
      parent: {
        border: "1px solid #ccc",
        margin: "2%",
        maxWidth: "40%"
      }
    };

    return (
      <div className="demo">
        <h1>with immutable.js data</h1>
        <div style={containerStyle}>
          <VictoryChart style={chartStyle} animate={{ duration: 2000 }}>
            <VictoryScatter
              groupComponent={<VictoryClipContainer/>}
              data={this.state.scatterData}
              animate={{
                onExit: {
                  duration: 500,
                  before: () => ({ opacity: 0.3 })
                },
                onEnter: {
                  duration: 500,
                  before: () => ({ opacity: 0.3 }),
                  after: (datum) => ({ opacity: datum.opacity || 1 })
                }
              }}
            />
          </VictoryChart>

        </div>
      </div>
    );
  }
}

export default App;
