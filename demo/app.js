/*global document:false window:false */
/*eslint-disable react/no-multi-comp */
import React from "react";
import ReactDOM from "react-dom";

import AreaDemo from "./components/victory-area-demo";
import AxisDemo from "./components/victory-axis-demo";
import BarDemo from "./components/victory-bar-demo";
import ChartDemo from "./components/victory-chart-demo";
import LineDemo from "./components/victory-line-demo";
import ScatterDemo from "./components/victory-scatter-demo";
import ErrorBarDemo from "./components/victory-errorbar-demo";
import CandlestickDemo from "./components/victory-candlestick-demo";
import EventsDemo from "./components/events-demo";
import GroupDemo from "./components/group-demo";
import VoronoiDemo from "./components/victory-voronoi-demo";
import TooltipDemo from "./components/victory-tooltip-demo";
import ZoomContainerDemo from "./components/victory-zoom-container-demo";
import VoronoiContainerDemo from "./components/victory-voronoi-container-demo";
import CursorContainerDemo from "./components/victory-cursor-container-demo";
import CreateContainerDemo from "./components/create-container-demo";
import BrushContainerDemo from "./components/victory-brush-container-demo";
import AnimationDemo from "./components/animation-demo";
import SelectionDemo from "./components/selection-demo";
import PolarDemo from "./components/victory-polar-chart-demo";
import ImmutableDemo from "./components/immutable-demo";
import ExternalEventsDemo from "./components/external-events-demo";
import VictoryBrushLine from "./components/victory-brush-line-demo";
import DebugDemo from "./components/debug-demo";

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
    case "/axis": Child = AxisDemo; break;
    case "/area": Child = AreaDemo; break;
    case "/bar": Child = BarDemo; break;
    case "/chart": Child = ChartDemo; break;
    case "/line": Child = LineDemo; break;
    case "/scatter": Child = ScatterDemo; break;
    case "/errorbar": Child = ErrorBarDemo; break;
    case "/candlestick": Child = CandlestickDemo; break;
    case "/events": Child = EventsDemo; break;
    case "/group": Child = GroupDemo; break;
    case "/voronoi": Child = VoronoiDemo; break;
    case "/tooltip": Child = TooltipDemo; break;
    case "/zoom-container": Child = ZoomContainerDemo; break;
    case "/voronoi-container": Child = VoronoiContainerDemo; break;
    case "/cursor-container": Child = CursorContainerDemo; break;
    case "/brush-container": Child = BrushContainerDemo; break;
    case "/animation": Child = AnimationDemo; break;
    case "/selection-container": Child = SelectionDemo; break;
    case "/create-container": Child = CreateContainerDemo; break;
    case "/polar": Child = PolarDemo; break;
    case "/immutable": Child = ImmutableDemo; break;
    case "/external-events": Child = ExternalEventsDemo; break;
    case "/victory-brush-line": Child = VictoryBrushLineDemo; break;
    case "/debug": Child = DebugDemo; break;
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
          <li><a href="#/chart">Victory Chart Demo</a></li>
          <li><a href="#/axis">Victory Axis Demo</a></li>
          <li><a href="#/area">Victory Area Demo</a></li>
          <li><a href="#/bar">Victory Bar Demo</a></li>
          <li><a href="#/line">Victory Line Demo</a></li>
          <li><a href="#/scatter">Victory Scatter Demo</a></li>
          <li><a href="#/errorbar">Victory Error Bar Demo</a></li>
          <li><a href="#/candlestick">Victory Candlestick Demo</a></li>
          <li><a href="#/events">Events Demo</a></li>
          <li><a href="#/group">Group Demo</a></li>
          <li><a href="#/voronoi">Victory Voronoi Demo</a></li>
          <li><a href="#/tooltip">Victory Tooltip Demo</a></li>
          <li><a href="#/zoom-container">Victory Zoom Container Demo</a></li>
          <li><a href="#/voronoi-container">Victory Voronoi Container Demo</a></li>
          <li><a href="#/cursor-container">Victory Cursor Container Demo</a></li>
          <li><a href="#/brush-container">Victory Brush Container Demo</a></li>
          <li><a href="#/animation">Animation Demo</a></li>
          <li><a href="#/selection-container">Victory Selection Container Demo</a></li>
          <li><a href="#/create-container">createContainer Demo</a></li>
          <li><a href="#/polar">Polar Demo</a></li>
          <li><a href="#/immutable">immutable.js demo</a></li>
          <li><a href="#/external-events">External Events demo</a></li>
          <li><a href="#/victory-brush-line">VictoryBrushLine demo</a></li>
        </ul>
        <Child/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("content"));


