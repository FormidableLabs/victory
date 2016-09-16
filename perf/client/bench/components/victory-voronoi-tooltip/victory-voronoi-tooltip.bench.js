import React from "react";
import ReactDOM from "react-dom";
import VictoryVoronoiTooltip from "src/components/victory-voronoi-tooltip/victory-voronoi-tooltip";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples } from "./sample-data";

suite("<VictoryVoronoiTooltip> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryVoronoiTooltip> clipPath", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      size={10}
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      size={10}
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      size={10}
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryVoronoiTooltip> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryVoronoiTooltip>",
    () => ReactDOM.render(<VictoryVoronoiTooltip />, element));
  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryVoronoiTooltip />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryVoronoiTooltip> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryVoronoiTooltip>",
    () => ReactDOM.render(<VictoryVoronoiTooltip />, element));
  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryVoronoiTooltip />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryVoronoiTooltip> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryVoronoiTooltip>",
    () => ReactDOM.render(<VictoryVoronoiTooltip />, element));
  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryVoronoiTooltip />
    </VictoryStack>, element));
}, suiteOpts);
