/*global document:false window:false */
/*eslint-disable react/no-multi-comp */
import React from "react";
import ReactDOM from "react-dom";
import { keys } from "lodash";

import AreaDemo from "./components/victory-area-demo";
import AxisDemo from "./components/victory-axis-demo";
import BarDemo from "./components/victory-bar-demo";
import ChartDemo from "./components/victory-chart-demo";
import LineDemo from "./components/victory-line-demo";
import HistogramDemo from "./components/victory-histogram-demo";
import ScatterDemo from "./components/victory-scatter-demo";
import ErrorBarDemo from "./components/victory-errorbar-demo";
import BoxplotDemo from "./components/victory-box-plot-demo";
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
import VictoryBrushLineDemo from "./components/victory-brush-line-demo";
import PerformanceDemo from "./components/performance";
import DebugDemo from "./components/debug-demo";
import VictoryLabelDemo from "./components/victory-label-demo";
import VictoryLegendDemo from "./components/victory-legend-demo";
import VictoryPieDemo from "./components/victory-pie-demo";
import VictoryDemo from "./components/victory-demo";
import HorizontalDemo from "./components/horizontal-demo";
import DraggableDemo from "./components/draggable-demo";

const MAP = {
  "/axis": { component: AxisDemo, name: "AxisDemo" },
  "/area": { component: AreaDemo, name: "AreaDemo" },
  "/bar": { component: BarDemo, name: "BarDemo" },
  "/chart": { component: ChartDemo, name: "ChartDemo" },
  "/line": { component: LineDemo, name: "LineDemo" },
  "/histogram": { component: HistogramDemo, name: "HistogramDemo" },
  "/scatter": { component: ScatterDemo, name: "ScatterDemo" },
  "/errorbar": { component: ErrorBarDemo, name: "ErrorBarDemo" },
  "/candlestick": { component: CandlestickDemo, name: "CandlestickDemo" },
  "/boxplot": { component: BoxplotDemo, name: "BoxplotDemo" },
  "/events": { component: EventsDemo, name: "EventsDemo" },
  "/group": { component: GroupDemo, name: "GroupDemo" },
  "/voronoi": { component: VoronoiDemo, name: "VoronoiDemo" },
  "/tooltip": { component: TooltipDemo, name: "TooltipDemo" },
  "/zoom-container": { component: ZoomContainerDemo, name: "ZoomContainerDemo" },
  "/voronoi-container": { component: VoronoiContainerDemo, name: "VoronoiContainerDemo" },
  "/cursor-container": { component: CursorContainerDemo, name: "CursorContainerDemo" },
  "/brush-container": { component: BrushContainerDemo, name: "BrushContainerDemo" },
  "/animation": { component: AnimationDemo, name: "AnimationDemo" },
  "/selection-container": { component: SelectionDemo, name: "SelectionDemo" },
  "/create-container": { component: CreateContainerDemo, name: "CreateContainerDemo" },
  "/polar": { component: PolarDemo, name: "PolarDemo" },
  "/immutable": { component: ImmutableDemo, name: "ImmutableDemo" },
  "/external-events": { component: ExternalEventsDemo, name: "ExternalEventsDemo" },
  "/victory-brush-line": { component: VictoryBrushLineDemo, name: "BrushLineDemo" },
  "/performance": { component: PerformanceDemo, name: "PerformanceDemo" },
  "/debug": { component: DebugDemo, name: "DebugDemo" },
  "/label": { component: VictoryLabelDemo, name: "LabelDemo" },
  "/legend": { component: VictoryLegendDemo, name: "LegendDemo" },
  "/pie": { component: VictoryPieDemo, name: "PieDemo" },
  "/victory": { component: VictoryDemo, name: "VictoryDemo" },
  "/horizontal": { component: HorizontalDemo, name: "HorizontalDemo" },
  "/draggable": { component: DraggableDemo, name: "DraggableDemo" }
};

class Home extends React.Component {
  render() {
    return <h1>Pick A Demo</h1>;
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        route: window.location.hash.substr(1)
      });
    });
  }

  getDemo() {
    const item = MAP[this.state.route] || {};
    return item.component || Home;
  }

  render() {
    const Child = this.getDemo();
    const routes = keys(MAP);
    return (
      <div>
        <h1>Demos</h1>
        <ul>
          {routes.map((route, index) => {
            const item = MAP[route] || {};
            return (
              <li key={index}>
                <a href={`#${route}`}>{item.name}</a>
              </li>
            );
          })}
        </ul>
        <Child />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
