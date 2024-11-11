import * as React from "react";
import * as ReactDOM from "react-dom";

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
import ThemeBuilder from "./components/theme-builder";

const DEMO_ROUTES = {
  "/demo/accessibility": {
    component: AccessibilityDemo,
    name: "AccessibilityDemo",
  },
  "/demo/animation": { component: AnimationDemo, name: "AnimationDemo" },
  "/demo/area": { component: AreaDemo, name: "AreaDemo" },
  "/demo/axis": { component: AxisDemo, name: "AxisDemo" },
  "/demo/bar": { component: BarDemo, name: "BarDemo" },
  "/demo/box-plot": { component: BoxPlotDemo, name: "BoxPlotDemo" },
  "/demo/brush-container": {
    component: BrushContainerDemo,
    name: "BrushContainerDemo",
  },
  "/demo/brush-line": { component: BrushLineDemo, name: "BrushLineDemo" },
  "/demo/group": { component: GroupDemo, name: "GroupDemo" },
  "/demo/horizontal": { component: HorizontalDemo, name: "HorizontalDemo" },
  "/demo/histogram": { component: HistogramDemo, name: "HistogramDemo" },
  "/demo/candlestick": { component: CandlestickDemo, name: "CandlestickDemo" },
  "/demo/canvas": { component: CanvasDemo, name: "CanvasDemo" },
  "/demo/chart": { component: ChartDemo, name: "ChartDemo" },
  "/demo/create-container": {
    component: CreateContainerDemo,
    name: "CreateContainerDemo",
  },
  "/demo/cursor-container": {
    component: CursorContainerDemo,
    name: "CursorContainerDemo",
  },
  "/demo/draggable": { component: DraggableDemo, name: "DraggableDemo" },
  "/demo/error-bar": { component: ErrorBarDemo, name: "ErrorBarDemo" },
  "/demo/events": { component: EventsDemo, name: "EventsDemo" },
  "/demo/external-events": {
    component: ExternalEventsDemo,
    name: "ExternalEventsDemo",
  },
  "/demo/immutable": { component: ImmutableDemo, name: "ImmutableDemo" },
  "/demo/label": { component: LabelDemo, name: "LabelDemo" },
  "/demo/legend": { component: LegendDemo, name: "LegendDemo" },
  "/demo/line": { component: LineDemo, name: "LineDemo" },
  "/demo/pie": { component: PieDemo, name: "PieDemo" },
  "/demo/polar-axis": { component: PolarAxisDemo, name: "PolarAxisDemo" },
  "/demo/primitives": { component: PrimitivesDemo, name: "PrimitivesDemo" },
  "/demo/scatter": { component: ScatterDemo, name: "ScatterDemo" },
  "/demo/selection": { component: SelectionDemo, name: "SelectionDemo" },
  "/demo/stack": { component: StackDemo, name: "StackDemo" },
  "/demo/stacked-theme": {
    component: StackedThemeDemos,
    name: "StackedThemeDemos",
  },
  "/demo/tooltip": { component: TooltipDemo, name: "TooltipDemo" },
  "/demo/victory": { component: VictoryDemo, name: "VictoryDemo" },
  "/demo/victory-selection-container": {
    component: VictorySelectionContainerDemo,
    name: "VictorySelectionContainerDemo",
  },
  "/demo/victory-shared-events": {
    component: VictorySharedEventsDemo,
    name: "VictorySharedEventsDemo",
  },
  "/demo/voronoi": { component: VoronoiDemo, name: "VoronoiDemo" },
  "/demo/voronoi-container": {
    component: VoronoiContainerDemo,
    name: "VoronoiContainerDemo",
  },
  "/demo/zoom-container": {
    component: ZoomContainerDemo,
    name: "ZoomContainerDemo",
  },
  "/demo/ouia": { component: OuiaDemo, name: "OuiaDemo" },
};

class Home extends React.Component {
  render() {
    return <h1>Pick A Demo</h1>;
  }
}

const NAV_ROUTES = {
  "/demo": { component: Home, name: "Demos" },
  "/theme-builder": { component: ThemeBuilder, name: "ThemeBuilder" },
};

interface AppState {
  route: string;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  fontFamily: "sans-serif",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  padding: "20px",
  borderBottom: "1px solid #ddd",
  fontWeight: "bold",
  fontSize: "1.1em",
  width: "100%",
  height: 62,
  top: 0,
  background: "#fff",
};

const sidebarStyle: React.CSSProperties = {
  flexShrink: "0",
  borderRight: "1px solid #ddd",
  overflow: "auto",
  padding: "5px",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  overflow: "hidden",
  flex: 1,
};

const mainStyle: React.CSSProperties = {
  overflow: "auto",
  flex: 1,
};

const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  padding: "0",
  margin: "0",
  color: "#666",
};

const linkStyle: React.CSSProperties = {
  color: "currentcolor",
  textDecoration: "none",
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  color: "#2165E3",
};

const listItemStyle: React.CSSProperties = {
  padding: "10px 15px",
  borderRadius: "5px",
  color: "#666",
  margin: "5px 0",
};

const activeListItemStyle: React.CSSProperties = {
  ...listItemStyle,
  backgroundColor: "#eee",
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      route: window.location.hash.slice(1),
    };

    if (this.state.route === "") {
      window.location.hash = "#/demo";
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  getChild() {
    const item =
      DEMO_ROUTES[this.state.route] || NAV_ROUTES[this.state.route] || {};
    return item.component || Home;
  }

  render() {
    const Child = this.getChild();
    const demoRoutes = Object.keys(DEMO_ROUTES).sort();
    const navRoutes = Object.keys(NAV_ROUTES);

    const isDemoRoute = this.state.route.startsWith("/demo");

    return (
      <div style={containerStyle}>
        <nav style={navStyle}>
          {navRoutes.map((route, index) => {
            return (
              <a
                key={index}
                href={`#${route}`}
                style={
                  this.state.route.startsWith(route)
                    ? activeLinkStyle
                    : linkStyle
                }
              >
                {NAV_ROUTES[route]?.name}
              </a>
            );
          })}
        </nav>
        <div style={contentStyle}>
          {isDemoRoute ? (
            <>
              <aside style={sidebarStyle}>
                <ul style={listStyle}>
                  {demoRoutes.map((route, index) => {
                    const item = DEMO_ROUTES[route] || {};
                    const isActive = this.state.route === route;
                    return (
                      <li
                        key={index}
                        style={isActive ? activeListItemStyle : listItemStyle}
                      >
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
            </>
          ) : (
            <Child />
          )}
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<App />, document.getElementById("content"));
