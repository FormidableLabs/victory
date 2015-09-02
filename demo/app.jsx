/*global document:false*/
import React from "react";
import {VictoryChart} from "../src/index";


class App extends React.Component {

  render() {
    return (
      <div className="demo">
        <p>
          <VictoryChart />
          <VictoryChart interpolation="linear"
            data={[
              [{x: -3, y: -2}, {x: 1, y: -1.5}, {x: 2, y: 3}, {x: 3, y: 4}],
              [{x: 0, y: 0}, {x: 1, y: 5}, {x: 4, y: 8}, {x: 5, y: 6}]
            ]}/>
          <VictoryChart
          showGridLines={{x: true, y: true}}
            data={[
              {x: 1, y: 4, size: 3, symbol: "circle", color: "red"},
              {x: 2, y: 3, size: 5, symbol: "triangleUp", color: "green"},
              {x: 4, y: 4, size: 7, symbol: "star"}
            ]}
            dataAttributes={{type: "scatter"}}
            y={(x) => x}/>
          <VictoryChart
          showGridLines={{x: true, y: true}}
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
              [-2, -1, 0, 1, 3, 4],
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

        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
