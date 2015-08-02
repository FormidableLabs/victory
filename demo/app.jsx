/*global document:false*/
import React from "react";
import {VictoryChart} from "../src/index";
import _ from "lodash";

const twoLinesData = [
  _.range(0, 100, 1).map((x) => {return {x, y: Math.sin(x)}}),
  _.range(0, 100, 1).map((x) => {return {x, y: Math.sin(x + 5)}}),
];

const namedData = {
  lineOne: _.range(0, 100, 1).map((x) => {return {x, y: Math.sin(x)}}),
  lineTwo: _.range(0, 100, 1).map((x) => {return {x, y: Math.sin(x + 5)}}),
  lineThree: _.range(0, 100, 1).map((x) => {return {x, y: Math.sin(x + 10)}})
};

class App extends React.Component {

  render() {
    return (
      <div className="demo">
        <p>
          <VictoryChart />
          <VictoryChart
            y={(x) => Math.sin(x)}
          />
          <VictoryChart
            y={[(x) => Math.sin(x),
                (x) => Math.sin(x + 5),
                (x) => Math.sin(x + 10)]}
            sample={25}
            lineStyles={[{"stroke": "blue"},
                         {"stroke": "red"},
                         {"stroke": "orange"}]}
          />
          <VictoryChart
            data={twoLinesData}
            lineStyles={[{"stroke": "green"},
                         {"stroke": "blue"}]}
          />
          <VictoryChart
            data={namedData}
            lineStyles={{lineOne: {"stroke": "orange"},
                         lineThree: {stroke: "lightblue"},
                         lineTwo: {"stroke": "red"}}}
          />
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
