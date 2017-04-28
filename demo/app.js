/*global document:false, window:false */
/*eslint-disable react/no-multi-comp */
import React from "react";
import ReactDOM from "react-dom";
import AnimationDemo from "./victory-animation-demo";
import LabelDemo from "./victory-label-demo";
import LegendDemo from "./victory-legend-demo";
import TooltipDemo from "./victory-tooltip-demo";

class Home extends React.Component {
  render() {
    return (
      <h1>Pick A Demo</h1>
    );
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentWillMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        route: window.location.hash.substr(1)
      });
    });
  }

  getDemo() { // eslint-disable-line complexity
    let Child;
    switch (this.state.route) {
    case "/animation": Child = AnimationDemo; break;
    case "/label": Child = LabelDemo; break;
    case "/legend": Child = LegendDemo; break;
    case "/tooltip": Child = TooltipDemo; break;
    default: Child = Home;
    }
    return Child;
  }

  render() {
    const Child = this.getDemo();
    return (
      <div>
        <h1>Demos</h1>
        <ul>
          <li><a href="#/animation">Victory Animation Demo</a></li>
          <li><a href="#/label">Victory Label Demo</a></li>
          <li><a href="#/legend">Victory Legend</a></li>
          <li><a href="#/tooltip">Victory Tooltip Demo</a></li>
        </ul>
        <Child/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("content"));
