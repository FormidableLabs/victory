import React from "react";
import ReactDOM from "react-dom";
import VictoryLine from "src/components/victory-line/victory-line";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../bench-helpers.js";

suite("<VictoryLine> data", () => {
  benchmark("identity fn", () => ReactDOM.render(<VictoryLine />, element));

  benchmark("10 pts", () => ReactDOM.render(
    <VictoryLine
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 2},
        {x: 5, y: 1},
        {x: 6, y: 2},
        {x: 7, y: 3},
        {x: 8, y: 3},
        {x: 9, y: 2},
        {x: 10, y: 1}
      ]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryLine
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 2},
        {x: 5, y: 1},
        {x: 6, y: 2},
        {x: 7, y: 3},
        {x: 8, y: 3},
        {x: 9, y: 2},
        {x: 10, y: 1},
        {x: 11, y: 1},
        {x: 12, y: 2},
        {x: 13, y: 3},
        {x: 14, y: 2},
        {x: 15, y: 1},
        {x: 16, y: 2},
        {x: 17, y: 3},
        {x: 18, y: 3},
        {x: 19, y: 2},
        {x: 20, y: 1},
        {x: 21, y: 1},
        {x: 22, y: 2},
        {x: 23, y: 3},
        {x: 24, y: 2},
        {x: 25, y: 1},
        {x: 26, y: 2},
        {x: 27, y: 3},
        {x: 28, y: 3},
        {x: 29, y: 2},
        {x: 30, y: 1},
        {x: 31, y: 1},
        {x: 32, y: 2},
        {x: 33, y: 3},
        {x: 34, y: 2},
        {x: 35, y: 1},
        {x: 36, y: 2},
        {x: 37, y: 3},
        {x: 38, y: 3},
        {x: 39, y: 2},
        {x: 40, y: 1},
        {x: 41, y: 1},
        {x: 42, y: 2},
        {x: 43, y: 3},
        {x: 44, y: 2},
        {x: 45, y: 1},
        {x: 46, y: 2},
        {x: 47, y: 3},
        {x: 48, y: 3},
        {x: 49, y: 2},
        {x: 50, y: 1}
      ]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryLine
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 2},
        {x: 5, y: 1},
        {x: 6, y: 2},
        {x: 7, y: 3},
        {x: 8, y: 3},
        {x: 9, y: 2},
        {x: 10, y: 1},
        {x: 11, y: 1},
        {x: 12, y: 2},
        {x: 13, y: 3},
        {x: 14, y: 2},
        {x: 15, y: 1},
        {x: 16, y: 2},
        {x: 17, y: 3},
        {x: 18, y: 3},
        {x: 19, y: 2},
        {x: 20, y: 1},
        {x: 21, y: 1},
        {x: 22, y: 2},
        {x: 23, y: 3},
        {x: 24, y: 2},
        {x: 25, y: 1},
        {x: 26, y: 2},
        {x: 27, y: 3},
        {x: 28, y: 3},
        {x: 29, y: 2},
        {x: 30, y: 1},
        {x: 31, y: 1},
        {x: 32, y: 2},
        {x: 33, y: 3},
        {x: 34, y: 2},
        {x: 35, y: 1},
        {x: 36, y: 2},
        {x: 37, y: 3},
        {x: 38, y: 3},
        {x: 39, y: 2},
        {x: 40, y: 1},
        {x: 41, y: 1},
        {x: 42, y: 2},
        {x: 43, y: 3},
        {x: 44, y: 2},
        {x: 45, y: 1},
        {x: 46, y: 2},
        {x: 47, y: 3},
        {x: 48, y: 3},
        {x: 49, y: 2},
        {x: 50, y: 1},
        {x: 51, y: 1},
        {x: 52, y: 2},
        {x: 53, y: 3},
        {x: 54, y: 2},
        {x: 55, y: 1},
        {x: 56, y: 2},
        {x: 57, y: 3},
        {x: 58, y: 3},
        {x: 59, y: 2},
        {x: 60, y: 1},
        {x: 61, y: 1},
        {x: 62, y: 2},
        {x: 63, y: 3},
        {x: 64, y: 2},
        {x: 65, y: 1},
        {x: 66, y: 2},
        {x: 67, y: 3},
        {x: 68, y: 3},
        {x: 69, y: 2},
        {x: 70, y: 1},
        {x: 71, y: 1},
        {x: 72, y: 2},
        {x: 73, y: 3},
        {x: 74, y: 2},
        {x: 75, y: 1},
        {x: 76, y: 2},
        {x: 77, y: 3},
        {x: 78, y: 3},
        {x: 79, y: 2},
        {x: 80, y: 1},
        {x: 81, y: 1},
        {x: 82, y: 2},
        {x: 83, y: 3},
        {x: 84, y: 2},
        {x: 85, y: 1},
        {x: 86, y: 2},
        {x: 87, y: 3},
        {x: 88, y: 3},
        {x: 89, y: 2},
        {x: 90, y: 1},
        {x: 91, y: 1},
        {x: 92, y: 2},
        {x: 93, y: 3},
        {x: 94, y: 2},
        {x: 95, y: 1},
        {x: 96, y: 2},
        {x: 97, y: 3},
        {x: 98, y: 3},
        {x: 99, y: 2},
        {x: 100, y: 1}
      ]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryLine> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryLine
      data={[
        {count: 1, y: 1},
        {count: 2, y: 2},
        {count: 3, y: 3},
        {count: 4, y: 2},
        {count: 5, y: 1},
        {count: 6, y: 2},
        {count: 7, y: 3},
        {count: 8, y: 3},
        {count: 9, y: 2},
        {count: 10, y: 1}
      ]}
      x={"count"}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryLine
      data={[
        {count: 1, y: 1},
        {count: 2, y: 2},
        {count: 3, y: 3},
        {count: 4, y: 2},
        {count: 5, y: 1},
        {count: 6, y: 2},
        {count: 7, y: 3},
        {count: 8, y: 3},
        {count: 9, y: 2},
        {count: 10, y: 1},
        {count: 11, y: 1},
        {count: 12, y: 2},
        {count: 13, y: 3},
        {count: 14, y: 2},
        {count: 15, y: 1},
        {count: 16, y: 2},
        {count: 17, y: 3},
        {count: 18, y: 3},
        {count: 19, y: 2},
        {count: 20, y: 1},
        {count: 21, y: 1},
        {count: 22, y: 2},
        {count: 23, y: 3},
        {count: 24, y: 2},
        {count: 25, y: 1},
        {count: 26, y: 2},
        {count: 27, y: 3},
        {count: 28, y: 3},
        {count: 29, y: 2},
        {count: 30, y: 1},
        {count: 31, y: 1},
        {count: 32, y: 2},
        {count: 33, y: 3},
        {count: 34, y: 2},
        {count: 35, y: 1},
        {count: 36, y: 2},
        {count: 37, y: 3},
        {count: 38, y: 3},
        {count: 39, y: 2},
        {count: 40, y: 1},
        {count: 41, y: 1},
        {count: 42, y: 2},
        {count: 43, y: 3},
        {count: 44, y: 2},
        {count: 45, y: 1},
        {count: 46, y: 2},
        {count: 47, y: 3},
        {count: 48, y: 3},
        {count: 49, y: 2},
        {count: 50, y: 1}
      ]}
      x={"count"}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryLine
      data={[
        {count: 1, y: 1},
        {count: 2, y: 2},
        {count: 3, y: 3},
        {count: 4, y: 2},
        {count: 5, y: 1},
        {count: 6, y: 2},
        {count: 7, y: 3},
        {count: 8, y: 3},
        {count: 9, y: 2},
        {count: 10, y: 1},
        {count: 11, y: 1},
        {count: 12, y: 2},
        {count: 13, y: 3},
        {count: 14, y: 2},
        {count: 15, y: 1},
        {count: 16, y: 2},
        {count: 17, y: 3},
        {count: 18, y: 3},
        {count: 19, y: 2},
        {count: 20, y: 1},
        {count: 21, y: 1},
        {count: 22, y: 2},
        {count: 23, y: 3},
        {count: 24, y: 2},
        {count: 25, y: 1},
        {count: 26, y: 2},
        {count: 27, y: 3},
        {count: 28, y: 3},
        {count: 29, y: 2},
        {count: 30, y: 1},
        {count: 31, y: 1},
        {count: 32, y: 2},
        {count: 33, y: 3},
        {count: 34, y: 2},
        {count: 35, y: 1},
        {count: 36, y: 2},
        {count: 37, y: 3},
        {count: 38, y: 3},
        {count: 39, y: 2},
        {count: 40, y: 1},
        {count: 41, y: 1},
        {count: 42, y: 2},
        {count: 43, y: 3},
        {count: 44, y: 2},
        {count: 45, y: 1},
        {count: 46, y: 2},
        {count: 47, y: 3},
        {count: 48, y: 3},
        {count: 49, y: 2},
        {count: 50, y: 1},
        {count: 51, y: 1},
        {count: 52, y: 2},
        {count: 53, y: 3},
        {count: 54, y: 2},
        {count: 55, y: 1},
        {count: 56, y: 2},
        {count: 57, y: 3},
        {count: 58, y: 3},
        {count: 59, y: 2},
        {count: 60, y: 1},
        {count: 61, y: 1},
        {count: 62, y: 2},
        {count: 63, y: 3},
        {count: 64, y: 2},
        {count: 65, y: 1},
        {count: 66, y: 2},
        {count: 67, y: 3},
        {count: 68, y: 3},
        {count: 69, y: 2},
        {count: 70, y: 1},
        {count: 71, y: 1},
        {count: 72, y: 2},
        {count: 73, y: 3},
        {count: 74, y: 2},
        {count: 75, y: 1},
        {count: 76, y: 2},
        {count: 77, y: 3},
        {count: 78, y: 3},
        {count: 79, y: 2},
        {count: 80, y: 1},
        {count: 81, y: 1},
        {count: 82, y: 2},
        {count: 83, y: 3},
        {count: 84, y: 2},
        {count: 85, y: 1},
        {count: 86, y: 2},
        {count: 87, y: 3},
        {count: 88, y: 3},
        {count: 89, y: 2},
        {count: 90, y: 1},
        {count: 91, y: 1},
        {count: 92, y: 2},
        {count: 93, y: 3},
        {count: 94, y: 2},
        {count: 95, y: 1},
        {count: 96, y: 2},
        {count: 97, y: 3},
        {count: 98, y: 3},
        {count: 99, y: 2},
        {count: 100, y: 1}
      ]}
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
