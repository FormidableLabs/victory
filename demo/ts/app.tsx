import * as React from "react";
import * as ReactDOM from "react-dom";
import { keys } from "lodash";

import AccessibilityDemo from "./components/accessibility-demo";
import AnimationDemo from "./components/animation-demo";
import AreaDemo from "./components/victory-area-demo";
import AxisDemo from "./components/victory-axis-demo";
import BarDemo from "./components/victory-bar-demo";
import BoxPlotDemo from "./components/victory-box-plot-demo";
import BrushContainerDemo from "./components/victory-brush-container-demo";
import BrushLineDemo from "./components/victory-brush-line-demo";
import CandlestickDemo from "./components/victory-candlestick-demo";
import CanvasDemo from "./components/canvas-demo";
import ChartDemo from "./components/victory-chart-demo";
import CreateContainerDemo from "./components/create-container-demo";
import CursorContainerDemo from "./components/victory-cursor-container-demo";
import DraggableDemo from "./components/draggable-demo";
import ErrorBarDemo from "./components/victory-errorbar-demo";
import EventsDemo from "./components/events-demo";
import ExternalEventsDemo from "./components/external-events-demo";
import GroupDemo from "./components/group-demo";
import HistogramDemo from "./components/victory-histogram-demo";
import HorizontalDemo from "./components/horizontal-demo";
import ImmutableDemo from "./components/immutable-demo";
import LabelDemo from "./components/victory-label-demo";
import LegendDemo from "./components/victory-legend-demo";
import LineDemo from "./components/victory-line-demo";
import PieDemo from "./components/victory-pie-demo";
import PolarAxisDemo from "./components/victory-polar-axis-demo";
import PrimitivesDemo from "./components/primitives-demo";
import ScatterDemo from "./components/victory-scatter-demo";
import SelectionDemo from "./components/selection-demo";
import StackDemo from "./components/victory-stack-demo";
import StackedThemeDemos from "./components/stacked-theme-demo";
import TooltipDemo from "./components/victory-tooltip-demo";
import VictoryDemo from "./components/victory-demo";
import VictorySelectionContainerDemo from "./components/victory-selection-container-demo";
import VictorySharedEventsDemo from "./components/victory-shared-events-demo";
import VoronoiContainerDemo from "./components/victory-voronoi-container-demo";
import VoronoiDemo from "./components/victory-voronoi-demo";
import ZoomContainerDemo from "./components/victory-zoom-container-demo";
import OuiaDemo from "./components/ouia-demo";

const MAP = {
  "/accessibility": { component: AccessibilityDemo, name: "AccessibilityDemo" },
  "/animation": { component: AnimationDemo, name: "AnimationDemo" },
  "/area": { component: AreaDemo, name: "AreaDemo" },
  "/axis": { component: AxisDemo, name: "AxisDemo" },
  "/bar": { component: BarDemo, name: "BarDemo" },
  "/box-plot": { component: BoxPlotDemo, name: "BoxPlotDemo" },
  "/brush-container": {
    component: BrushContainerDemo,
    name: "BrushContainerDemo",
  },
  "/brush-line": { component: BrushLineDemo, name: "BrushLineDemo" },
  "/group": { component: GroupDemo, name: "GroupDemo" },
  "/horizontal": { component: HorizontalDemo, name: "HorizontalDemo" },
  "/histogram": { component: HistogramDemo, name: "HistogramDemo" },
  "/candlestick": { component: CandlestickDemo, name: "CandlestickDemo" },
  "/canvas": { component: CanvasDemo, name: "CanvasDemo" },
  "/chart": { component: ChartDemo, name: "ChartDemo" },
  "/create-container": {
    component: CreateContainerDemo,
    name: "CreateContainerDemo",
  },
  "/cursor-container": {
    component: CursorContainerDemo,
    name: "CursorContainerDemo",
  },
  "/draggable": { component: DraggableDemo, name: "DraggableDemo" },
  "/error-bar": { component: ErrorBarDemo, name: "ErrorBarDemo" },
  "/events": { component: EventsDemo, name: "EventsDemo" },
  "/external-events": {
    component: ExternalEventsDemo,
    name: "ExternalEventsDemo",
  },
  "/immutable": { component: ImmutableDemo, name: "ImmutableDemo" },
  "/label": { component: LabelDemo, name: "LabelDemo" },
  "/legend": { component: LegendDemo, name: "LegendDemo" },
  "/line": { component: LineDemo, name: "LineDemo" },
  "/pie": { component: PieDemo, name: "PieDemo" },
  "/polar-axis": { component: PolarAxisDemo, name: "PolarAxisDemo" },
  "/primitives": { component: PrimitivesDemo, name: "PrimitivesDemo" },
  "/scatter": { component: ScatterDemo, name: "ScatterDemo" },
  "/selection": { component: SelectionDemo, name: "SelectionDemo" },
  "/stack": { component: StackDemo, name: "StackDemo" },
  "/stacked-theme": { component: StackedThemeDemos, name: "StackedThemeDemos" },
  "/tooltip": { component: TooltipDemo, name: "TooltipDemo" },
  "/victory": { component: VictoryDemo, name: "VictoryDemo" },
  "/victory-selection-container": {
    component: VictorySelectionContainerDemo,
    name: "VictorySelectionContainerDemo",
  },
  "/victory-shared-events": {
    component: VictorySharedEventsDemo,
    name: "VictorySharedEventsDemo",
  },
  "/voronoi": { component: VoronoiDemo, name: "VoronoiDemo" },
  "/voronoi-container": {
    component: VoronoiContainerDemo,
    name: "VoronoiContainerDemo",
  },
  "/zoom-container": {
    component: ZoomContainerDemo,
    name: "ZoomContainerDemo",
  },
  "/ouia": { component: OuiaDemo, name: "OuiaDemo" },
};

class Home extends React.Component {
  render() {
    return <h1>Pick A Demo</h1>;
  }
}

interface AppState {
  route: string;
}

const containerStyle = {
  fontFamily: "sans-serif",
  display: "flex",
  gap: "20px",
  height: "100vh",
  overflow: "hidden",
};

const sidebarStyle = {
  flexShrink: "0",
  width: "240px",
  borderRight: "1px solid #ddd",
  overflow: "auto",
  padding: "0 20px 20px",
};

const mainStyle = {
  overflow: "auto",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  listStyle: "none",
  padding: "0",
  margin: "0",
} as const;

const linkStyle = {
  color: "black",
  fontSize: "14px",
  textDecoration: "none",
};

const activeLinkStyle = {
  ...linkStyle,
  fontWeight: "bold",
  textDecoration: "underline",
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      route: window.location.hash.substr(1),
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  getDemo() {
    const item = MAP[this.state.route] || {};
    return item.component || Home;
  }

  render() {
    const Child = this.getDemo();
    const routes = keys(MAP).sort();
    return (
      <div style={containerStyle}>
        <aside style={sidebarStyle}>
          <h1>Victory Demos</h1>
          <ul style={listStyle}>
            {routes.map((route, index) => {
              const item = MAP[route] || {};
              const isActive = this.state.route === route;
              return (
                <li key={index}>
                  <a
                    href={`#${route}`}
                    style={isActive ? activeLinkStyle : linkStyle}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
        <main style={mainStyle}>
          <Child />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
