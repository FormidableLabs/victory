/*global document:false*/
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        Edit me!
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
