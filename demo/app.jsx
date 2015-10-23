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

  render() {
    return (
      <div className="demo">
        <p>
          <VictoryChart
            domain={{
              x: [0, 5],
              y: [0, 10]
            }}
            style={{width: 500, height: 300, margin: 50}}
          >
            <VictoryLine style={{data: {stroke: "red"}}}/>
          </VictoryChart>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

ReactDOM.render(<App/>, content);
