import React from "react";
import ReactDOM from "react-dom";
import VictoryErrorBar from "src/components/victory-errorbar/victory-errorbar";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples, dataAccessorSamples } from "./sample-data";

suite("<VictoryErrorBar> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryErrorBar
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryErrorBar
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryErrorBar
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryErrorBar> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryErrorBar
      data={dataAccessorSamples[10]}
      x={"count"}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryErrorBar
      data={dataAccessorSamples[50]}
      x={"count"}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryErrorBar
      data={dataAccessorSamples[100]}
      x={"count"}
    />, element)
  );
}, suiteOpts);

suite("<VictoryErrorBar> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryErrorBar>",
    () => ReactDOM.render(<VictoryErrorBar />, element));
  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryErrorBar />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryErrorBar> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryErrorBar>",
    () => ReactDOM.render(<VictoryErrorBar />, element));
  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryErrorBar />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryErrorBar> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryErrorBar>",
    () => ReactDOM.render(<VictoryErrorBar />, element));
  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryErrorBar />
    </VictoryStack>, element));
}, suiteOpts);
