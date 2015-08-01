/*global document:false*/
import React from "react";
import {VictoryChart} from "../src/index";
import _ from "lodash";

const twoLinesData = [
  _.range(0, 100, 1).map((x) => {return {x: x, y: Math.sin(x)}}),
  _.range(0, 100, 1).map((x) => {return {x: x, y: Math.cos(x)}}),
]

class App extends React.Component {

  render() {
    return (
      <div className="demo">
        <p>
          <VictoryChart />
        </p>
        <p>
          <VictoryChart y={(x) => Math.sin(x)}/>
          <VictoryChart y={(x) => Math.sin(x)}
                        sample={25}
          />
          <VictoryChart data={twoLinesData}/>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
