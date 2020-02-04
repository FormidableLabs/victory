import * as React from "react";
import * as ReactDOM from "react-dom";
import { keys } from "lodash";

import AreaDemo from "./components/victory-area-demo";
import AxisDemo from "./components/victory-axis-demo";
import BarDemo from "./components/victory-bar-demo";
import ChartDemo from "./components/victory-chart-demo";
import LegendDemo from "./components/victory-legend-demo";
import LineDemo from "./components/victory-line-demo";
import PieDemo from "./components/victory-pie-demo";
import TooltipDemo from "./components/victory-tooltip-demo";

const MAP = {
  "/axis": { component: AxisDemo, name: "AxisDemo" },
  "/area": { component: AreaDemo, name: "AreaDemo" },
  "/bar": { component: BarDemo, name: "BarDemo" },
  "/chart": { component: ChartDemo, name: "ChartDemo" },
  "/line": { component: LineDemo, name: "LineDemo" },
  "/tooltip": { component: TooltipDemo, name: "TooltipDemo" },
  "/legend": { component: LegendDemo, name: "LegendDemo" },
  "/pie": { component: PieDemo, name: "PieDemo" }
};

class Home extends React.Component {
  render() {
    return <h1>Pick A Demo</h1>;
  }
}

interface AppState {
  route: string;
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

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
        <h1>Demos (Typescript)</h1>
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
