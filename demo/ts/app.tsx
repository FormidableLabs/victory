import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { keys } from "lodash";

import AreaDemo from "./components/victory-area-demo";

const MAP = {
  // "/axis": { component: AxisDemo, name: "AxisDemo" },
  "/area": { component: AreaDemo, name: "AreaDemo" },
  // "/bar": { component: BarDemo, name: "BarDemo" },
  // "/chart": { component: ChartDemo, name: "ChartDemo" },
  // "/line": { component: LineDemo, name: "LineDemo" },
  // "/scatter": { component: ScatterDemo, name: "ScatterDemo" },
  // "/errorbar": { component: ErrorBarDemo, name: "ErrorBarDemo" },
  // "/candlestick": { component: CandlestickDemo, name: "CandlestickDemo" },
  // "/boxplot": { component: BoxplotDemo, name: "BoxplotDemo" },
  // "/events": { component: EventsDemo, name: "EventsDemo" },
  // "/group": { component: GroupDemo, name: "GroupDemo" },
  // "/voronoi": { component: VoronoiDemo, name: "VoronoiDemo" },
  // "/tooltip": { component: TooltipDemo, name: "TooltipDemo" },
  // "/zoom-container": { component: ZoomContainerDemo, name: "ZoomContainerDemo" },
  // "/voronoi-container": { component: VoronoiContainerDemo, name: "VoronoiContainerDemo" },
  // "/cursor-container": { component: CursorContainerDemo, name: "CursorContainerDemo" },
  // "/brush-container": { component: BrushContainerDemo, name: "BrushContainerDemo" },
  // "/animation": { component: AnimationDemo, name: "AnimationDemo" },
  // "/selection-container": { component: SelectionDemo, name: "SelectionDemo" },
  // "/create-container": { component: CreateContainerDemo, name: "CreateContainerDemo" },
  // "/polar": { component: PolarDemo, name: "PolarDemo" },
  // "/immutable": { component: ImmutableDemo, name: "ImmutableDemo" },
  // "/external-events": { component: ExternalEventsDemo, name: "ExternalEventsDemo" },
  // "/victory-brush-line": { component: VictoryBrushLineDemo, name: "BrushLineDemo" },
  // "/performance": { component: PerformanceDemo, name: "PerformanceDemo" },
  // "/debug": { component: DebugDemo, name: "DebugDemo" },
  // "/label": { component: VictoryLabelDemo, name: "LabelDemo" },
  // "/legend": { component: VictoryLegendDemo, name: "LegendDemo" },
  // "/pie": { component: VictoryPieDemo, name: "PieDemo" },
  // "/victory": { component: VictoryDemo, name: "VictoryDemo" },
  // "/horizontal": { component: HorizontalDemo, name: "HorizontalDemo" },
  // "/draggable": { component: DraggableDemo, name: "DraggableDemo" }
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

ReactDOM.render(
  <App />,
  document.getElementById('content')
);