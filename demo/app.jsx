/*global document:false*/
import React from "react";
import {VictoryDonut} from "../src/index";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <p>
          < VictoryDonut/>
        </p>
        <p>
          < VictoryDonut color={"red"}/>
        </p>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
