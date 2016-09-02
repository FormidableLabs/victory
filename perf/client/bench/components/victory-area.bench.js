import React from "react";
import ReactDOM from "react-dom";
import VictoryArea from "src/components/victory-area/victory-area";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../bench-helpers.js";

suite("<VictoryArea> data", () => {
  benchmark("identity fn", () => ReactDOM.render(<VictoryArea />, element));

  benchmark("10 pts", () => ReactDOM.render(
    <VictoryArea
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 1},
        {x: 5, y: 3},
        {x: 6, y: 4},
        {x: 7, y: 2},
        {x: 8, y: 1},
        {x: 9, y: 3},
        {x: 10, y: 2}
      ]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryArea
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 1},
        {x: 5, y: 3},
        {x: 6, y: 4},
        {x: 7, y: 2},
        {x: 8, y: 1},
        {x: 9, y: 3},
        {x: 10, y: 2},
        {x: 11, y: 1},
        {x: 12, y: 2},
        {x: 13, y: 3},
        {x: 14, y: 1},
        {x: 15, y: 3},
        {x: 16, y: 4},
        {x: 17, y: 2},
        {x: 18, y: 1},
        {x: 19, y: 3},
        {x: 20, y: 2},
        {x: 31, y: 1},
        {x: 32, y: 2},
        {x: 33, y: 3},
        {x: 34, y: 1},
        {x: 35, y: 3},
        {x: 36, y: 4},
        {x: 37, y: 2},
        {x: 38, y: 1},
        {x: 39, y: 3},
        {x: 40, y: 2},
        {x: 41, y: 1},
        {x: 42, y: 2},
        {x: 43, y: 3},
        {x: 44, y: 1},
        {x: 45, y: 3},
        {x: 46, y: 4},
        {x: 47, y: 2},
        {x: 48, y: 1},
        {x: 49, y: 3},
        {x: 50, y: 2}
      ]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryArea
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 1},
        {x: 5, y: 3},
        {x: 6, y: 4},
        {x: 7, y: 2},
        {x: 8, y: 1},
        {x: 9, y: 3},
        {x: 10, y: 2},
        {x: 11, y: 1},
        {x: 12, y: 2},
        {x: 13, y: 3},
        {x: 14, y: 1},
        {x: 15, y: 3},
        {x: 16, y: 4},
        {x: 17, y: 2},
        {x: 18, y: 1},
        {x: 19, y: 3},
        {x: 20, y: 2},
        {x: 31, y: 1},
        {x: 32, y: 2},
        {x: 33, y: 3},
        {x: 34, y: 1},
        {x: 35, y: 3},
        {x: 36, y: 4},
        {x: 37, y: 2},
        {x: 38, y: 1},
        {x: 39, y: 3},
        {x: 40, y: 2},
        {x: 41, y: 1},
        {x: 42, y: 2},
        {x: 43, y: 3},
        {x: 44, y: 1},
        {x: 45, y: 3},
        {x: 46, y: 4},
        {x: 47, y: 2},
        {x: 48, y: 1},
        {x: 49, y: 3},
        {x: 50, y: 2},
        {x: 51, y: 1},
        {x: 52, y: 2},
        {x: 53, y: 3},
        {x: 54, y: 1},
        {x: 55, y: 3},
        {x: 56, y: 4},
        {x: 57, y: 2},
        {x: 58, y: 1},
        {x: 59, y: 3},
        {x: 60, y: 2},
        {x: 61, y: 1},
        {x: 62, y: 2},
        {x: 63, y: 3},
        {x: 64, y: 1},
        {x: 65, y: 3},
        {x: 66, y: 4},
        {x: 67, y: 2},
        {x: 68, y: 1},
        {x: 69, y: 3},
        {x: 70, y: 2},
        {x: 71, y: 1},
        {x: 72, y: 2},
        {x: 73, y: 3},
        {x: 74, y: 1},
        {x: 75, y: 3},
        {x: 76, y: 4},
        {x: 77, y: 2},
        {x: 78, y: 1},
        {x: 79, y: 3},
        {x: 80, y: 2},
        {x: 81, y: 1},
        {x: 82, y: 2},
        {x: 83, y: 3},
        {x: 84, y: 1},
        {x: 85, y: 3},
        {x: 86, y: 4},
        {x: 87, y: 2},
        {x: 88, y: 1},
        {x: 89, y: 3},
        {x: 90, y: 2},
        {x: 91, y: 1},
        {x: 92, y: 2},
        {x: 93, y: 3},
        {x: 94, y: 1},
        {x: 95, y: 3},
        {x: 96, y: 4},
        {x: 97, y: 2},
        {x: 98, y: 1},
        {x: 99, y: 3},
        {x: 100, y: 2}
      ]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryArea> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryArea
      data={[
        {amount: 1, yield: 1, error: 0.5},
        {amount: 2, yield: 2, error: 1.1},
        {amount: 3, yield: 3, error: 0},
        {amount: 4, yield: 2, error: 0.1},
        {amount: 5, yield: 1, error: 1.5},
        {amount: 6, yield: 1, error: 0.5},
        {amount: 7, yield: 2, error: 1.1},
        {amount: 8, yield: 3, error: 0},
        {amount: 9, yield: 2, error: 0.1},
        {amount: 10, yield: 1, error: 1.5}
      ]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryArea
      data={[
        {amount: 1, yield: 1, error: 0.5},
        {amount: 2, yield: 2, error: 1.1},
        {amount: 3, yield: 3, error: 0},
        {amount: 4, yield: 2, error: 0.1},
        {amount: 5, yield: 1, error: 1.5},
        {amount: 6, yield: 1, error: 0.5},
        {amount: 7, yield: 2, error: 1.1},
        {amount: 8, yield: 3, error: 0},
        {amount: 9, yield: 2, error: 0.1},
        {amount: 10, yield: 1, error: 1.5},
        {amount: 11, yield: 1, error: 0.5},
        {amount: 12, yield: 2, error: 1.1},
        {amount: 13, yield: 3, error: 0},
        {amount: 14, yield: 2, error: 0.1},
        {amount: 15, yield: 1, error: 1.5},
        {amount: 16, yield: 1, error: 0.5},
        {amount: 17, yield: 2, error: 1.1},
        {amount: 18, yield: 3, error: 0},
        {amount: 19, yield: 2, error: 0.1},
        {amount: 20, yield: 1, error: 1.5},
        {amount: 21, yield: 1, error: 0.5},
        {amount: 22, yield: 2, error: 1.1},
        {amount: 23, yield: 3, error: 0},
        {amount: 24, yield: 2, error: 0.1},
        {amount: 25, yield: 1, error: 1.5},
        {amount: 26, yield: 1, error: 0.5},
        {amount: 27, yield: 2, error: 1.1},
        {amount: 28, yield: 3, error: 0},
        {amount: 29, yield: 2, error: 0.1},
        {amount: 30, yield: 1, error: 1.5},
        {amount: 31, yield: 1, error: 0.5},
        {amount: 32, yield: 2, error: 1.1},
        {amount: 33, yield: 3, error: 0},
        {amount: 34, yield: 2, error: 0.1},
        {amount: 35, yield: 1, error: 1.5},
        {amount: 36, yield: 1, error: 0.5},
        {amount: 37, yield: 2, error: 1.1},
        {amount: 38, yield: 3, error: 0},
        {amount: 39, yield: 2, error: 0.1},
        {amount: 40, yield: 1, error: 1.5},
        {amount: 41, yield: 1, error: 0.5},
        {amount: 42, yield: 2, error: 1.1},
        {amount: 43, yield: 3, error: 0},
        {amount: 44, yield: 2, error: 0.1},
        {amount: 45, yield: 1, error: 1.5},
        {amount: 46, yield: 1, error: 0.5},
        {amount: 47, yield: 2, error: 1.1},
        {amount: 48, yield: 3, error: 0},
        {amount: 49, yield: 2, error: 0.1},
        {amount: 50, yield: 1, error: 1.5}
      ]}
      x={"amount"}
      y={(data) => (data.yield + data.error)}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryArea
      data={[
        {amount: 1, yield: 1, error: 0.5},
        {amount: 2, yield: 2, error: 1.1},
        {amount: 3, yield: 3, error: 0},
        {amount: 4, yield: 2, error: 0.1},
        {amount: 5, yield: 1, error: 1.5},
        {amount: 6, yield: 1, error: 0.5},
        {amount: 7, yield: 2, error: 1.1},
        {amount: 8, yield: 3, error: 0},
        {amount: 9, yield: 2, error: 0.1},
        {amount: 10, yield: 1, error: 1.5},
        {amount: 11, yield: 1, error: 0.5},
        {amount: 12, yield: 2, error: 1.1},
        {amount: 13, yield: 3, error: 0},
        {amount: 14, yield: 2, error: 0.1},
        {amount: 15, yield: 1, error: 1.5},
        {amount: 16, yield: 1, error: 0.5},
        {amount: 17, yield: 2, error: 1.1},
        {amount: 18, yield: 3, error: 0},
        {amount: 19, yield: 2, error: 0.1},
        {amount: 20, yield: 1, error: 1.5},
        {amount: 21, yield: 1, error: 0.5},
        {amount: 22, yield: 2, error: 1.1},
        {amount: 23, yield: 3, error: 0},
        {amount: 24, yield: 2, error: 0.1},
        {amount: 25, yield: 1, error: 1.5},
        {amount: 26, yield: 1, error: 0.5},
        {amount: 27, yield: 2, error: 1.1},
        {amount: 28, yield: 3, error: 0},
        {amount: 29, yield: 2, error: 0.1},
        {amount: 30, yield: 1, error: 1.5},
        {amount: 31, yield: 1, error: 0.5},
        {amount: 32, yield: 2, error: 1.1},
        {amount: 33, yield: 3, error: 0},
        {amount: 34, yield: 2, error: 0.1},
        {amount: 35, yield: 1, error: 1.5},
        {amount: 36, yield: 1, error: 0.5},
        {amount: 37, yield: 2, error: 1.1},
        {amount: 38, yield: 3, error: 0},
        {amount: 39, yield: 2, error: 0.1},
        {amount: 40, yield: 1, error: 1.5},
        {amount: 41, yield: 1, error: 0.5},
        {amount: 42, yield: 2, error: 1.1},
        {amount: 43, yield: 3, error: 0},
        {amount: 44, yield: 2, error: 0.1},
        {amount: 45, yield: 1, error: 1.5},
        {amount: 46, yield: 1, error: 0.5},
        {amount: 47, yield: 2, error: 1.1},
        {amount: 48, yield: 3, error: 0},
        {amount: 49, yield: 2, error: 0.1},
        {amount: 50, yield: 1, error: 1.5},
        {amount: 51, yield: 1, error: 0.5},
        {amount: 52, yield: 2, error: 1.1},
        {amount: 53, yield: 3, error: 0},
        {amount: 54, yield: 2, error: 0.1},
        {amount: 55, yield: 1, error: 1.5},
        {amount: 56, yield: 1, error: 0.5},
        {amount: 57, yield: 2, error: 1.1},
        {amount: 58, yield: 3, error: 0},
        {amount: 59, yield: 2, error: 0.1},
        {amount: 60, yield: 1, error: 1.5},
        {amount: 61, yield: 1, error: 0.5},
        {amount: 62, yield: 2, error: 1.1},
        {amount: 63, yield: 3, error: 0},
        {amount: 64, yield: 2, error: 0.1},
        {amount: 65, yield: 1, error: 1.5},
        {amount: 66, yield: 1, error: 0.5},
        {amount: 67, yield: 2, error: 1.1},
        {amount: 68, yield: 3, error: 0},
        {amount: 69, yield: 2, error: 0.1},
        {amount: 70, yield: 1, error: 1.5},
        {amount: 71, yield: 1, error: 0.5},
        {amount: 72, yield: 2, error: 1.1},
        {amount: 73, yield: 3, error: 0},
        {amount: 74, yield: 2, error: 0.1},
        {amount: 75, yield: 1, error: 1.5},
        {amount: 76, yield: 1, error: 0.5},
        {amount: 77, yield: 2, error: 1.1},
        {amount: 78, yield: 3, error: 0},
        {amount: 79, yield: 2, error: 0.1},
        {amount: 80, yield: 1, error: 1.5},
        {amount: 81, yield: 1, error: 0.5},
        {amount: 82, yield: 2, error: 1.1},
        {amount: 83, yield: 3, error: 0},
        {amount: 84, yield: 2, error: 0.1},
        {amount: 85, yield: 1, error: 1.5},
        {amount: 86, yield: 1, error: 0.5},
        {amount: 87, yield: 2, error: 1.1},
        {amount: 88, yield: 3, error: 0},
        {amount: 89, yield: 2, error: 0.1},
        {amount: 90, yield: 1, error: 1.5},
        {amount: 91, yield: 1, error: 0.5},
        {amount: 92, yield: 2, error: 1.1},
        {amount: 93, yield: 3, error: 0},
        {amount: 94, yield: 2, error: 0.1},
        {amount: 95, yield: 1, error: 1.5},
        {amount: 96, yield: 1, error: 0.5},
        {amount: 97, yield: 2, error: 1.1},
        {amount: 98, yield: 3, error: 0},
        {amount: 99, yield: 2, error: 0.1},
        {amount: 100, yield: 1, error: 1.5}
      ]}
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
