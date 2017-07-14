/*eslint-disable no-magic-numbers */
/*global setInterval:false */

import React from "react";
import {
  VictoryChart, VictoryLine, VictoryZoomContainer
} from "../../src/index";

import { range, last } from "lodash";

const y = (x) => Math.sin(x / 10);
const initData = () => range(70).map((x) => ({ x, y: y(x) }));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: initData(),
      zoomDomain: null
    };

    setInterval(() => {
      const { data } = this.state;
      const x = last(data).x + 1;

      if (x > 1000) {
        this.setState({ data: initData() });
      } else {
        data.push({ x, y: y(x) });
        this.setState({ data });
      }
    }, 20);
  }
  render() {
    return (
      <div style={{ maxWidth: 500 }}>
        <VictoryChart containerComponent={<VictoryZoomContainer dimension="x" />}>
          <VictoryLine
            data={this.state.data}
          />
          <VictoryLine
            data={this.state.data}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default App;
