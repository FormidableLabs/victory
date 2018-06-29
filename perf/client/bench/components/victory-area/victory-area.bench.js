import React from "react";
import ReactDOM from "react-dom";
import VictoryArea from "src/components/victory-area/victory-area";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples, dataAccessorSamples } from "./sample-data";

suite("<VictoryArea> data", () => {
  benchmark("identity fn", () => ReactDOM.render(<VictoryArea />, element));

  benchmark("10 pts", () => ReactDOM.render(
    <VictoryArea
      data={dataSamples[10]}
    />, element
  ));

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryArea
      data={dataSamples[50]}
    />, element
  ));

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryArea
      data={dataSamples[100]}
    />, element
  ));
}, suiteOpts);

suite("<VictoryArea> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryArea
      data={dataAccessorSamples[10]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryArea
      data={dataAccessorSamples[50]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryArea
      data={dataAccessorSamples[100]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );
}, suiteOpts);

suite("<VictoryArea> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryArea>", () => ReactDOM.render(<VictoryArea />, element));

  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryArea />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryArea> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryArea>", () => ReactDOM.render(<VictoryArea />, element));

  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryArea />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryArea> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryArea>", () => ReactDOM.render(<VictoryArea />, element));

  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryArea />
    </VictoryStack>, element));
}, suiteOpts);
