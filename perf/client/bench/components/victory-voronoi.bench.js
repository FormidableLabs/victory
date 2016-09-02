import React from "react";
import ReactDOM from "react-dom";
import VictoryVoronoi from "src/components/victory-voronoi/victory-voronoi";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../bench-helpers.js";

suite("<VictoryVoronoi> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoi
      data={[
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78}
      ]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoi
      data={[
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 11, y: 10},
        {x: 21, y: 50},
        {x: 31, y: 20},
        {x: 41, y: 70},
        {x: 51, y: 10},
        {x: 61, y: 20},
        {x: 71, y: 36},
        {x: 81, y: 32},
        {x: 91, y: 29},
        {x: 110, y: 78},
        {x: 12, y: 10},
        {x: 22, y: 50},
        {x: 32, y: 20},
        {x: 42, y: 70},
        {x: 52, y: 10},
        {x: 62, y: 20},
        {x: 72, y: 36},
        {x: 82, y: 32},
        {x: 92, y: 29},
        {x: 120, y: 78},
        {x: 13, y: 10},
        {x: 23, y: 50},
        {x: 33, y: 20},
        {x: 43, y: 70},
        {x: 53, y: 10},
        {x: 63, y: 20},
        {x: 73, y: 36},
        {x: 83, y: 32},
        {x: 93, y: 29},
        {x: 130, y: 78},
        {x: 14, y: 10},
        {x: 24, y: 50},
        {x: 34, y: 20},
        {x: 44, y: 70},
        {x: 54, y: 10},
        {x: 64, y: 20},
        {x: 74, y: 36},
        {x: 84, y: 32},
        {x: 94, y: 29},
        {x: 140, y: 78}
      ]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoi
      data={[
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 11, y: 10},
        {x: 21, y: 50},
        {x: 31, y: 20},
        {x: 41, y: 70},
        {x: 51, y: 10},
        {x: 61, y: 20},
        {x: 71, y: 36},
        {x: 81, y: 32},
        {x: 91, y: 29},
        {x: 110, y: 78},
        {x: 12, y: 10},
        {x: 22, y: 50},
        {x: 32, y: 20},
        {x: 42, y: 70},
        {x: 52, y: 10},
        {x: 62, y: 20},
        {x: 72, y: 36},
        {x: 82, y: 32},
        {x: 92, y: 29},
        {x: 120, y: 78},
        {x: 13, y: 10},
        {x: 23, y: 50},
        {x: 33, y: 20},
        {x: 43, y: 70},
        {x: 53, y: 10},
        {x: 63, y: 20},
        {x: 73, y: 36},
        {x: 83, y: 32},
        {x: 93, y: 29},
        {x: 130, y: 78},
        {x: 14, y: 10},
        {x: 24, y: 50},
        {x: 34, y: 20},
        {x: 44, y: 70},
        {x: 54, y: 10},
        {x: 64, y: 20},
        {x: 74, y: 36},
        {x: 84, y: 32},
        {x: 94, y: 29},
        {x: 140, y: 78},
        {x: 15, y: 10},
        {x: 25, y: 50},
        {x: 35, y: 20},
        {x: 45, y: 70},
        {x: 55, y: 10},
        {x: 65, y: 20},
        {x: 75, y: 36},
        {x: 85, y: 32},
        {x: 95, y: 29},
        {x: 150, y: 78},
        {x: 16, y: 10},
        {x: 26, y: 50},
        {x: 36, y: 20},
        {x: 46, y: 70},
        {x: 56, y: 10},
        {x: 66, y: 20},
        {x: 76, y: 36},
        {x: 86, y: 32},
        {x: 96, y: 29},
        {x: 160, y: 78},
        {x: 17, y: 10},
        {x: 27, y: 50},
        {x: 37, y: 20},
        {x: 47, y: 70},
        {x: 57, y: 10},
        {x: 67, y: 20},
        {x: 77, y: 36},
        {x: 87, y: 32},
        {x: 97, y: 29},
        {x: 170, y: 78},
        {x: 18, y: 10},
        {x: 28, y: 50},
        {x: 38, y: 20},
        {x: 48, y: 70},
        {x: 58, y: 10},
        {x: 68, y: 20},
        {x: 78, y: 36},
        {x: 88, y: 32},
        {x: 98, y: 29},
        {x: 180, y: 78},
        {x: 19, y: 10},
        {x: 29, y: 50},
        {x: 39, y: 20},
        {x: 49, y: 70},
        {x: 59, y: 10},
        {x: 69, y: 20},
        {x: 79, y: 36},
        {x: 89, y: 32},
        {x: 99, y: 29},
        {x: 190, y: 78}
      ]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryVoronoi> clipPath", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoi
      size={10}
      data={[
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78}
      ]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoi
      size={10}
      data={[
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78}
      ]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoi
      size={10}
      data={[
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78},
        {x: 10, y: 10},
        {x: 20, y: 50},
        {x: 30, y: 20},
        {x: 40, y: 70},
        {x: 50, y: 10},
        {x: 60, y: 20},
        {x: 70, y: 36},
        {x: 80, y: 32},
        {x: 90, y: 29},
        {x: 100, y: 78}
      ]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryVoronoi> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryVoronoi>",
    () => ReactDOM.render(<VictoryVoronoi />, element));
  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryVoronoi />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryVoronoi> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryVoronoi>",
    () => ReactDOM.render(<VictoryVoronoi />, element));
  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryVoronoi />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryVoronoi> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryVoronoi>",
    () => ReactDOM.render(<VictoryVoronoi />, element));
  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryVoronoi />
    </VictoryStack>, element));
}, suiteOpts);
