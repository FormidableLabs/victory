import React from "react";
import ReactDOM from "react-dom";
import VictoryVoronoi from "src/components/victory-voronoi/victory-voronoi";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples } from "./sample-data";

suite("<VictoryVoronoi> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoi
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoi
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoi
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryVoronoi> clipPath", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoi
      size={10}
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoi
      size={10}
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoi
      size={10}
      data={dataSamples[100]}
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
