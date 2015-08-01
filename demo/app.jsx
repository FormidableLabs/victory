/*global document:false*/
import React from "react";
import {VictoryChart} from "../src/index";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <p>
          < VictoryChart/>
        </p>
        <p>
          < VictoryChart color={"red"}/>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
