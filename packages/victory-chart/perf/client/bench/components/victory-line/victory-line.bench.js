import React from "react";
import ReactDOM from "react-dom";
import VictoryLine from "src/components/victory-line/victory-line";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples, dataAccessorSamples } from "./sample-data";

suite("<VictoryLine> data", () => {
  benchmark("identity fn", () => ReactDOM.render(<VictoryLine />, element));

  benchmark("10 pts", () => ReactDOM.render(
    <VictoryLine
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryLine
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryLine
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryLine> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryLine
      data={dataAccessorSamples[10]}
      x={"count"}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryLine
      data={dataAccessorSamples[50]}
      x={"count"}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryLine
      data={dataAccessorSamples[100]}
      x={"count"}
    />, element)
  );
}, suiteOpts);

suite("<VictoryLine> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryLine>",
    () => ReactDOM.render(<VictoryLine />, element));
  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryLine />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryLine> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryLine>",
    () => ReactDOM.render(<VictoryLine />, element));
  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryLine />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryLine> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryLine>",
    () => ReactDOM.render(<VictoryLine />, element));
  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryLine />
    </VictoryStack>, element));
}, suiteOpts);
