import React from "react";
import ReactDOM from "react-dom";
import VictoryBar from "src/components/victory-bar/victory-bar";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples, dataAccessorSamples } from "./sample-data";

suite("<VictoryBar> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryBar
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryBar
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryBar
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryBar> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryBar
      data={dataAccessorSamples[10]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryBar
      data={dataAccessorSamples[50]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryBar
      data={dataAccessorSamples[100]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );
}, suiteOpts);

suite("<VictoryBar> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryBar>", () => ReactDOM.render(<VictoryBar />, element));

  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryBar />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryBar> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryBar>", () => ReactDOM.render(<VictoryBar />, element));

  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryBar />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryBar> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryBar>", () => ReactDOM.render(<VictoryBar />, element));

  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryBar />
    </VictoryStack>, element));

  benchmark("wrapped by <VictoryStack horizontal>", () => ReactDOM.render(
    <VictoryStack horizontal>
      <VictoryBar />
    </VictoryStack>, element));
}, suiteOpts);
