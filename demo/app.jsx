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
              [{x: 0, y: 0}, {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}],
              [{x: 0, y: 0}, {x: 1, y: 5}, {x: 4, y: 8}, {x: 5, y: 10}]
            ]}/>
          <VictoryChart
            data={[{x: 1, y: 5}, {x: 2, y: 3}, {x: 3, y: 4}]}
            dataAttributes={{type: "scatter", color: "blue"}}
            y={(x) => x}/>
          <VictoryChart
            y={(x) => 3 * x + 0.5}
            yAttributes={{stroke: "red"}}/>
          <VictoryChart y={[
            (x) => 3 * x + 0.5,
            (x) => 4 * x + 0.5,
            (x) => Math.sin(x)
          ]}
          yAttributes={[
            {name: "line-one", type: "line", stroke: "red", strokeWidth: 5},
            {name: "line-two", type: "line", stroke: "green"},
            {name: "line-3", type: "line", stroke: "blue"}
          ]}/>

        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
