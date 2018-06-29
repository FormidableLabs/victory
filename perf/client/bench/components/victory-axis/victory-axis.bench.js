import React from "react";
import ReactDOM from "react-dom";
import VictoryAxis from "src/components/victory-axis/victory-axis";
import { element, suiteOpts } from "../../helpers/bench-helpers.js";
import { tickValueSamples } from "./sample-data";

suite("<VictoryAxis>", () => {
  benchmark("independentAxis", () => ReactDOM.render(<VictoryAxis />, element));

  benchmark("dependentAxis", () => ReactDOM.render(<VictoryAxis dependentAxis />, element));

  benchmark("composed", () => ReactDOM.render(
    <svg>
      <VictoryAxis standalone={false} />
      <VictoryAxis dependentAxis standalone={false} />
    </svg>, element));

  benchmark("cross axis", () => ReactDOM.render(
    <svg>
      <VictoryAxis crossAxis standalone={false} />
      <VictoryAxis dependentAxis crossAxis standalone={false} />
    </svg>, element));
}, suiteOpts);

suite("<VictoryAxis> tick values", () => {
  benchmark("10 ticks", () => ReactDOM.render(
    <VictoryAxis
      label="Integers"
      tickValues={tickValueSamples[10]}
    />, element));

  benchmark("50 ticks", () => ReactDOM.render(
    <VictoryAxis
      label="Integers"
      tickValues={tickValueSamples[50]}
    />, element));

  benchmark("100 ticks", () => ReactDOM.render(
    <VictoryAxis
      label="Integers"
      tickValues={tickValueSamples[100]}
    />, element));
}, suiteOpts);
