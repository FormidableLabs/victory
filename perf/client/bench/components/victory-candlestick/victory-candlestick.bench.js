import React from "react";
import ReactDOM from "react-dom";
import VictoryCandlestick from "src/components/victory-candlestick/victory-candlestick";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { dataSamples, dataAccessorSamples } from "./sample-data";

suite("<VictoryCandlestick> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={dataSamples[10]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={dataSamples[50]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={dataSamples[100]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryCandlestick> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={dataAccessorSamples[10]}
      x={"count"}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={dataAccessorSamples[50]}
      x={"count"}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={dataAccessorSamples[100]}
      x={"count"}
    />, element)
  );
}, suiteOpts);

suite("<VictoryCandlestick> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryCandlestick>",
    () => ReactDOM.render(<VictoryCandlestick />, element));
  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryCandlestick />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryCandlestick> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryCandlestick>",
    () => ReactDOM.render(<VictoryCandlestick />, element));
  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryCandlestick />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryCandlestick> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryCandlestick>",
    () => ReactDOM.render(<VictoryCandlestick />, element));
  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryCandlestick />
    </VictoryStack>, element));
}, suiteOpts);
