/*global document:false*/
import React from "react";
import ReactDOM from "react-dom";
import {VictoryLabel} from "../src/index";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <p>
          < VictoryLabel/>
        </p>
        <p>
          < VictoryLabel color={"red"}/>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

ReactDOM.render(<App/>, content);
