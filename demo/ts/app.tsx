import * as React from "react";
import * as ReactDOM from "react-dom";

import AccessibilityDemo from "./components/accessibility-demo";
import BrushContainerDemo from "./components/victory-brush-container-demo";
import BrushLineDemo from "./components/victory-brush-line-demo";
import CreateContainerDemo from "./components/create-container-demo";
import CursorContainerDemo from "./components/victory-cursor-container-demo";
import DraggableDemo from "./components/draggable-demo";
import PolarAxisDemo from "./components/victory-polar-axis-demo";
import SelectionDemo from "./components/selection-demo";
import StackedThemeDemos from "./components/stacked-theme-demo";
import VictorySelectionContainerDemo from "./components/victory-selection-container-demo";
import VoronoiContainerDemo from "./components/victory-voronoi-container-demo";
import ZoomContainerDemo from "./components/victory-zoom-container-demo";
import ThemeBuilder from "./components/theme-builder";

const DEMO_ROUTES = {
  "/demo/accessibility": {
    component: AccessibilityDemo,
    name: "AccessibilityDemo",
  },
  "/demo/brush-container": {
    component: BrushContainerDemo,
    name: "BrushContainerDemo",
  },
  "/demo/brush-line": { component: BrushLineDemo, name: "BrushLineDemo" },

  "/demo/create-container": {
    component: CreateContainerDemo,
    name: "CreateContainerDemo",
  },
  "/demo/cursor-container": {
    component: CursorContainerDemo,
    name: "CursorContainerDemo",
  },
  "/demo/draggable": { component: DraggableDemo, name: "DraggableDemo" },
  "/demo/polar-axis": { component: PolarAxisDemo, name: "PolarAxisDemo" },
  "/demo/selection": { component: SelectionDemo, name: "SelectionDemo" },
  "/demo/stacked-theme": {
    component: StackedThemeDemos,
    name: "StackedThemeDemos",
  },
  "/demo/victory-selection-container": {
    component: VictorySelectionContainerDemo,
    name: "VictorySelectionContainerDemo",
  },
  "/demo/voronoi-container": {
    component: VoronoiContainerDemo,
    name: "VoronoiContainerDemo",
  },
  "/demo/zoom-container": {
    component: ZoomContainerDemo,
    name: "ZoomContainerDemo",
  },
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
