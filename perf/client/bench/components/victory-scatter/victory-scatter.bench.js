import React from "react";
import ReactDOM from "react-dom";
import VictoryScatter from "src/components/victory-scatter/victory-scatter";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples, dataAccessorSamples } from "./sample-data";

suite("<VictoryScatter> data", () => {
  benchmark("identity fn", () => ReactDOM.render(<VictoryScatter />, element));

  benchmark("10 pts", () => ReactDOM.render(
    <VictoryScatter
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryScatter
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryScatter
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryScatter> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryScatter
      data={dataAccessorSamples[10]}
      x={"count"}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryScatter
      data={dataAccessorSamples[50]}
      x={"count"}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryScatter
      data={dataAccessorSamples[100]}
      x={"count"}
    />, element)
  );
}, suiteOpts);

suite("<VictoryScatter> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryScatter>",
    () => ReactDOM.render(<VictoryScatter />, element));
  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryScatter />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryScatter> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryScatter>",
    () => ReactDOM.render(<VictoryScatter />, element));
  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryScatter />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryScatter> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryScatter>",
    () => ReactDOM.render(<VictoryScatter />, element));
  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryScatter />
    </VictoryStack>, element));
}, suiteOpts);
