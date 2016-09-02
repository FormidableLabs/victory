import React from "react";
import ReactDOM from "react-dom";
import VictoryCandlestick from "src/components/victory-candlestick/victory-candlestick";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../bench-helpers.js";

suite("<VictoryCandlestick> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={[
        {x: 1, open: 5, close: 10, high: 20, low: 3},
        {x: 2, open: 15, close: 20, high: 22, low: 8},
        {x: 3, open: 15, close: 20, high: 30, low: 10},
        {x: 4, open: 20, close: 25, high: 20, low: 10},
        {x: 5, open: 10, close: 13, high: 20, low: 5},
        {x: 6, open: 7, close: 10, high: 20, low: 3},
        {x: 7, open: 9, close: 10, high: 12, low: 2},
        {x: 8, open: 2, close: 5, high: 7, low: 1},
        {x: 9, open: 3, close: 5, high: 8, low: 0},
        {x: 10, open: 2, close: 3, high: 10, low: 1}
      ]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={[
        {x: 1, open: 5, close: 10, high: 20, low: 3},
        {x: 2, open: 15, close: 20, high: 22, low: 8},
        {x: 3, open: 15, close: 20, high: 30, low: 10},
        {x: 4, open: 20, close: 25, high: 20, low: 10},
        {x: 5, open: 10, close: 13, high: 20, low: 5},
        {x: 6, open: 7, close: 10, high: 20, low: 3},
        {x: 7, open: 9, close: 10, high: 12, low: 2},
        {x: 8, open: 2, close: 5, high: 7, low: 1},
        {x: 9, open: 3, close: 5, high: 8, low: 0},
        {x: 10, open: 2, close: 3, high: 10, low: 1},
        {x: 11, open: 5, close: 10, high: 20, low: 3},
        {x: 12, open: 15, close: 20, high: 22, low: 8},
        {x: 13, open: 15, close: 20, high: 30, low: 10},
        {x: 14, open: 20, close: 25, high: 20, low: 10},
        {x: 15, open: 10, close: 13, high: 20, low: 5},
        {x: 16, open: 7, close: 10, high: 20, low: 3},
        {x: 17, open: 9, close: 10, high: 12, low: 2},
        {x: 18, open: 2, close: 5, high: 7, low: 1},
        {x: 19, open: 3, close: 5, high: 8, low: 0},
        {x: 20, open: 2, close: 3, high: 10, low: 1},
        {x: 21, open: 5, close: 10, high: 20, low: 3},
        {x: 22, open: 15, close: 20, high: 22, low: 8},
        {x: 23, open: 15, close: 20, high: 30, low: 10},
        {x: 24, open: 20, close: 25, high: 20, low: 10},
        {x: 25, open: 10, close: 13, high: 20, low: 5},
        {x: 26, open: 7, close: 10, high: 20, low: 3},
        {x: 27, open: 9, close: 10, high: 12, low: 2},
        {x: 28, open: 2, close: 5, high: 7, low: 1},
        {x: 29, open: 3, close: 5, high: 8, low: 0},
        {x: 30, open: 2, close: 3, high: 10, low: 1},
        {x: 31, open: 5, close: 10, high: 20, low: 3},
        {x: 32, open: 15, close: 20, high: 22, low: 8},
        {x: 33, open: 15, close: 20, high: 30, low: 10},
        {x: 34, open: 20, close: 25, high: 20, low: 10},
        {x: 35, open: 10, close: 13, high: 20, low: 5},
        {x: 36, open: 7, close: 10, high: 20, low: 3},
        {x: 37, open: 9, close: 10, high: 12, low: 2},
        {x: 38, open: 2, close: 5, high: 7, low: 1},
        {x: 39, open: 3, close: 5, high: 8, low: 0},
        {x: 40, open: 2, close: 3, high: 10, low: 1},
        {x: 41, open: 5, close: 10, high: 20, low: 3},
        {x: 42, open: 15, close: 20, high: 22, low: 8},
        {x: 43, open: 15, close: 20, high: 30, low: 10},
        {x: 44, open: 20, close: 25, high: 20, low: 10},
        {x: 45, open: 10, close: 13, high: 20, low: 5},
        {x: 46, open: 7, close: 10, high: 20, low: 3},
        {x: 47, open: 9, close: 10, high: 12, low: 2},
        {x: 48, open: 2, close: 5, high: 7, low: 1},
        {x: 49, open: 3, close: 5, high: 8, low: 0},
        {x: 50, open: 2, close: 3, high: 10, low: 1}
      ]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={[
        {x: 1, open: 5, close: 10, high: 20, low: 3},
        {x: 2, open: 15, close: 20, high: 22, low: 8},
        {x: 3, open: 15, close: 20, high: 30, low: 10},
        {x: 4, open: 20, close: 25, high: 20, low: 10},
        {x: 5, open: 10, close: 13, high: 20, low: 5},
        {x: 6, open: 7, close: 10, high: 20, low: 3},
        {x: 7, open: 9, close: 10, high: 12, low: 2},
        {x: 8, open: 2, close: 5, high: 7, low: 1},
        {x: 9, open: 3, close: 5, high: 8, low: 0},
        {x: 10, open: 2, close: 3, high: 10, low: 1},
        {x: 11, open: 5, close: 10, high: 20, low: 3},
        {x: 12, open: 15, close: 20, high: 22, low: 8},
        {x: 13, open: 15, close: 20, high: 30, low: 10},
        {x: 14, open: 20, close: 25, high: 20, low: 10},
        {x: 15, open: 10, close: 13, high: 20, low: 5},
        {x: 16, open: 7, close: 10, high: 20, low: 3},
        {x: 17, open: 9, close: 10, high: 12, low: 2},
        {x: 18, open: 2, close: 5, high: 7, low: 1},
        {x: 19, open: 3, close: 5, high: 8, low: 0},
        {x: 20, open: 2, close: 3, high: 10, low: 1},
        {x: 21, open: 5, close: 10, high: 20, low: 3},
        {x: 22, open: 15, close: 20, high: 22, low: 8},
        {x: 23, open: 15, close: 20, high: 30, low: 10},
        {x: 24, open: 20, close: 25, high: 20, low: 10},
        {x: 25, open: 10, close: 13, high: 20, low: 5},
        {x: 26, open: 7, close: 10, high: 20, low: 3},
        {x: 27, open: 9, close: 10, high: 12, low: 2},
        {x: 28, open: 2, close: 5, high: 7, low: 1},
        {x: 29, open: 3, close: 5, high: 8, low: 0},
        {x: 30, open: 2, close: 3, high: 10, low: 1},
        {x: 31, open: 5, close: 10, high: 20, low: 3},
        {x: 32, open: 15, close: 20, high: 22, low: 8},
        {x: 33, open: 15, close: 20, high: 30, low: 10},
        {x: 34, open: 20, close: 25, high: 20, low: 10},
        {x: 35, open: 10, close: 13, high: 20, low: 5},
        {x: 36, open: 7, close: 10, high: 20, low: 3},
        {x: 37, open: 9, close: 10, high: 12, low: 2},
        {x: 38, open: 2, close: 5, high: 7, low: 1},
        {x: 39, open: 3, close: 5, high: 8, low: 0},
        {x: 40, open: 2, close: 3, high: 10, low: 1},
        {x: 41, open: 5, close: 10, high: 20, low: 3},
        {x: 42, open: 15, close: 20, high: 22, low: 8},
        {x: 43, open: 15, close: 20, high: 30, low: 10},
        {x: 44, open: 20, close: 25, high: 20, low: 10},
        {x: 45, open: 10, close: 13, high: 20, low: 5},
        {x: 46, open: 7, close: 10, high: 20, low: 3},
        {x: 47, open: 9, close: 10, high: 12, low: 2},
        {x: 48, open: 2, close: 5, high: 7, low: 1},
        {x: 49, open: 3, close: 5, high: 8, low: 0},
        {x: 50, open: 2, close: 3, high: 10, low: 1},
        {x: 51, open: 5, close: 10, high: 20, low: 3},
        {x: 52, open: 15, close: 20, high: 22, low: 8},
        {x: 53, open: 15, close: 20, high: 30, low: 10},
        {x: 54, open: 20, close: 25, high: 20, low: 10},
        {x: 55, open: 10, close: 13, high: 20, low: 5},
        {x: 56, open: 7, close: 10, high: 20, low: 3},
        {x: 57, open: 9, close: 10, high: 12, low: 2},
        {x: 58, open: 2, close: 5, high: 7, low: 1},
        {x: 59, open: 3, close: 5, high: 8, low: 0},
        {x: 60, open: 2, close: 3, high: 10, low: 1},
        {x: 61, open: 5, close: 10, high: 20, low: 3},
        {x: 62, open: 15, close: 20, high: 22, low: 8},
        {x: 63, open: 15, close: 20, high: 30, low: 10},
        {x: 64, open: 20, close: 25, high: 20, low: 10},
        {x: 65, open: 10, close: 13, high: 20, low: 5},
        {x: 66, open: 7, close: 10, high: 20, low: 3},
        {x: 67, open: 9, close: 10, high: 12, low: 2},
        {x: 68, open: 2, close: 5, high: 7, low: 1},
        {x: 69, open: 3, close: 5, high: 8, low: 0},
        {x: 70, open: 2, close: 3, high: 10, low: 1},
        {x: 71, open: 5, close: 10, high: 20, low: 3},
        {x: 72, open: 15, close: 20, high: 22, low: 8},
        {x: 73, open: 15, close: 20, high: 30, low: 10},
        {x: 74, open: 20, close: 25, high: 20, low: 10},
        {x: 75, open: 10, close: 13, high: 20, low: 5},
        {x: 76, open: 7, close: 10, high: 20, low: 3},
        {x: 77, open: 9, close: 10, high: 12, low: 2},
        {x: 78, open: 2, close: 5, high: 7, low: 1},
        {x: 79, open: 3, close: 5, high: 8, low: 0},
        {x: 80, open: 2, close: 3, high: 10, low: 1},
        {x: 81, open: 5, close: 10, high: 20, low: 3},
        {x: 82, open: 15, close: 20, high: 22, low: 8},
        {x: 83, open: 15, close: 20, high: 30, low: 10},
        {x: 84, open: 20, close: 25, high: 20, low: 10},
        {x: 85, open: 10, close: 13, high: 20, low: 5},
        {x: 86, open: 7, close: 10, high: 20, low: 3},
        {x: 87, open: 9, close: 10, high: 12, low: 2},
        {x: 88, open: 2, close: 5, high: 7, low: 1},
        {x: 89, open: 3, close: 5, high: 8, low: 0},
        {x: 90, open: 2, close: 3, high: 10, low: 1},
        {x: 91, open: 5, close: 10, high: 20, low: 3},
        {x: 92, open: 15, close: 20, high: 22, low: 8},
        {x: 93, open: 15, close: 20, high: 30, low: 10},
        {x: 94, open: 20, close: 25, high: 20, low: 10},
        {x: 95, open: 10, close: 13, high: 20, low: 5},
        {x: 96, open: 7, close: 10, high: 20, low: 3},
        {x: 97, open: 9, close: 10, high: 12, low: 2},
        {x: 98, open: 2, close: 5, high: 7, low: 1},
        {x: 99, open: 3, close: 5, high: 8, low: 0},
        {x: 100, open: 2, close: 3, high: 10, low: 1}
      ]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryCandlestick> data accessor", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={[
        {count: 1, open: 5, close: 10, high: 20, low: 3},
        {count: 2, open: 15, close: 20, high: 22, low: 8},
        {count: 3, open: 15, close: 20, high: 30, low: 10},
        {count: 4, open: 20, close: 25, high: 20, low: 10},
        {count: 5, open: 10, close: 13, high: 20, low: 5},
        {count: 6, open: 7, close: 10, high: 20, low: 3},
        {count: 7, open: 9, close: 10, high: 12, low: 2},
        {count: 8, open: 2, close: 5, high: 7, low: 1},
        {count: 9, open: 3, close: 5, high: 8, low: 0},
        {count: 10, open: 2, close: 3, high: 10, low: 1}
      ]}
      x={"count"}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={[
        {count: 1, open: 5, close: 10, high: 20, low: 3},
        {count: 2, open: 15, close: 20, high: 22, low: 8},
        {count: 3, open: 15, close: 20, high: 30, low: 10},
        {count: 4, open: 20, close: 25, high: 20, low: 10},
        {count: 5, open: 10, close: 13, high: 20, low: 5},
        {count: 6, open: 7, close: 10, high: 20, low: 3},
        {count: 7, open: 9, close: 10, high: 12, low: 2},
        {count: 8, open: 2, close: 5, high: 7, low: 1},
        {count: 9, open: 3, close: 5, high: 8, low: 0},
        {count: 10, open: 2, close: 3, high: 10, low: 1},
        {count: 11, open: 5, close: 10, high: 20, low: 3},
        {count: 12, open: 15, close: 20, high: 22, low: 8},
        {count: 13, open: 15, close: 20, high: 30, low: 10},
        {count: 14, open: 20, close: 25, high: 20, low: 10},
        {count: 15, open: 10, close: 13, high: 20, low: 5},
        {count: 16, open: 7, close: 10, high: 20, low: 3},
        {count: 17, open: 9, close: 10, high: 12, low: 2},
        {count: 18, open: 2, close: 5, high: 7, low: 1},
        {count: 19, open: 3, close: 5, high: 8, low: 0},
        {count: 20, open: 2, close: 3, high: 10, low: 1},
        {count: 21, open: 5, close: 10, high: 20, low: 3},
        {count: 22, open: 15, close: 20, high: 22, low: 8},
        {count: 23, open: 15, close: 20, high: 30, low: 10},
        {count: 24, open: 20, close: 25, high: 20, low: 10},
        {count: 25, open: 10, close: 13, high: 20, low: 5},
        {count: 26, open: 7, close: 10, high: 20, low: 3},
        {count: 27, open: 9, close: 10, high: 12, low: 2},
        {count: 28, open: 2, close: 5, high: 7, low: 1},
        {count: 29, open: 3, close: 5, high: 8, low: 0},
        {count: 30, open: 2, close: 3, high: 10, low: 1},
        {count: 31, open: 5, close: 10, high: 20, low: 3},
        {count: 32, open: 15, close: 20, high: 22, low: 8},
        {count: 33, open: 15, close: 20, high: 30, low: 10},
        {count: 34, open: 20, close: 25, high: 20, low: 10},
        {count: 35, open: 10, close: 13, high: 20, low: 5},
        {count: 36, open: 7, close: 10, high: 20, low: 3},
        {count: 37, open: 9, close: 10, high: 12, low: 2},
        {count: 38, open: 2, close: 5, high: 7, low: 1},
        {count: 39, open: 3, close: 5, high: 8, low: 0},
        {count: 40, open: 2, close: 3, high: 10, low: 1},
        {count: 41, open: 5, close: 10, high: 20, low: 3},
        {count: 42, open: 15, close: 20, high: 22, low: 8},
        {count: 43, open: 15, close: 20, high: 30, low: 10},
        {count: 44, open: 20, close: 25, high: 20, low: 10},
        {count: 45, open: 10, close: 13, high: 20, low: 5},
        {count: 46, open: 7, close: 10, high: 20, low: 3},
        {count: 47, open: 9, close: 10, high: 12, low: 2},
        {count: 48, open: 2, close: 5, high: 7, low: 1},
        {count: 49, open: 3, close: 5, high: 8, low: 0},
        {count: 50, open: 2, close: 3, high: 10, low: 1}
      ]}
      x={"count"}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryCandlestick
      data={[
        {count: 1, open: 5, close: 10, high: 20, low: 3},
        {count: 2, open: 15, close: 20, high: 22, low: 8},
        {count: 3, open: 15, close: 20, high: 30, low: 10},
        {count: 4, open: 20, close: 25, high: 20, low: 10},
        {count: 5, open: 10, close: 13, high: 20, low: 5},
        {count: 6, open: 7, close: 10, high: 20, low: 3},
        {count: 7, open: 9, close: 10, high: 12, low: 2},
        {count: 8, open: 2, close: 5, high: 7, low: 1},
        {count: 9, open: 3, close: 5, high: 8, low: 0},
        {count: 10, open: 2, close: 3, high: 10, low: 1},
        {count: 11, open: 5, close: 10, high: 20, low: 3},
        {count: 12, open: 15, close: 20, high: 22, low: 8},
        {count: 13, open: 15, close: 20, high: 30, low: 10},
        {count: 14, open: 20, close: 25, high: 20, low: 10},
        {count: 15, open: 10, close: 13, high: 20, low: 5},
        {count: 16, open: 7, close: 10, high: 20, low: 3},
        {count: 17, open: 9, close: 10, high: 12, low: 2},
        {count: 18, open: 2, close: 5, high: 7, low: 1},
        {count: 19, open: 3, close: 5, high: 8, low: 0},
        {count: 20, open: 2, close: 3, high: 10, low: 1},
        {count: 21, open: 5, close: 10, high: 20, low: 3},
        {count: 22, open: 15, close: 20, high: 22, low: 8},
        {count: 23, open: 15, close: 20, high: 30, low: 10},
        {count: 24, open: 20, close: 25, high: 20, low: 10},
        {count: 25, open: 10, close: 13, high: 20, low: 5},
        {count: 26, open: 7, close: 10, high: 20, low: 3},
        {count: 27, open: 9, close: 10, high: 12, low: 2},
        {count: 28, open: 2, close: 5, high: 7, low: 1},
        {count: 29, open: 3, close: 5, high: 8, low: 0},
        {count: 30, open: 2, close: 3, high: 10, low: 1},
        {count: 31, open: 5, close: 10, high: 20, low: 3},
        {count: 32, open: 15, close: 20, high: 22, low: 8},
        {count: 33, open: 15, close: 20, high: 30, low: 10},
        {count: 34, open: 20, close: 25, high: 20, low: 10},
        {count: 35, open: 10, close: 13, high: 20, low: 5},
        {count: 36, open: 7, close: 10, high: 20, low: 3},
        {count: 37, open: 9, close: 10, high: 12, low: 2},
        {count: 38, open: 2, close: 5, high: 7, low: 1},
        {count: 39, open: 3, close: 5, high: 8, low: 0},
        {count: 40, open: 2, close: 3, high: 10, low: 1},
        {count: 41, open: 5, close: 10, high: 20, low: 3},
        {count: 42, open: 15, close: 20, high: 22, low: 8},
        {count: 43, open: 15, close: 20, high: 30, low: 10},
        {count: 44, open: 20, close: 25, high: 20, low: 10},
        {count: 45, open: 10, close: 13, high: 20, low: 5},
        {count: 46, open: 7, close: 10, high: 20, low: 3},
        {count: 47, open: 9, close: 10, high: 12, low: 2},
        {count: 48, open: 2, close: 5, high: 7, low: 1},
        {count: 49, open: 3, close: 5, high: 8, low: 0},
        {count: 50, open: 2, close: 3, high: 10, low: 1},
        {count: 51, open: 5, close: 10, high: 20, low: 3},
        {count: 52, open: 15, close: 20, high: 22, low: 8},
        {count: 53, open: 15, close: 20, high: 30, low: 10},
        {count: 54, open: 20, close: 25, high: 20, low: 10},
        {count: 55, open: 10, close: 13, high: 20, low: 5},
        {count: 56, open: 7, close: 10, high: 20, low: 3},
        {count: 57, open: 9, close: 10, high: 12, low: 2},
        {count: 58, open: 2, close: 5, high: 7, low: 1},
        {count: 59, open: 3, close: 5, high: 8, low: 0},
        {count: 60, open: 2, close: 3, high: 10, low: 1},
        {count: 61, open: 5, close: 10, high: 20, low: 3},
        {count: 62, open: 15, close: 20, high: 22, low: 8},
        {count: 63, open: 15, close: 20, high: 30, low: 10},
        {count: 64, open: 20, close: 25, high: 20, low: 10},
        {count: 65, open: 10, close: 13, high: 20, low: 5},
        {count: 66, open: 7, close: 10, high: 20, low: 3},
        {count: 67, open: 9, close: 10, high: 12, low: 2},
        {count: 68, open: 2, close: 5, high: 7, low: 1},
        {count: 69, open: 3, close: 5, high: 8, low: 0},
        {count: 70, open: 2, close: 3, high: 10, low: 1},
        {count: 71, open: 5, close: 10, high: 20, low: 3},
        {count: 72, open: 15, close: 20, high: 22, low: 8},
        {count: 73, open: 15, close: 20, high: 30, low: 10},
        {count: 74, open: 20, close: 25, high: 20, low: 10},
        {count: 75, open: 10, close: 13, high: 20, low: 5},
        {count: 76, open: 7, close: 10, high: 20, low: 3},
        {count: 77, open: 9, close: 10, high: 12, low: 2},
        {count: 78, open: 2, close: 5, high: 7, low: 1},
        {count: 79, open: 3, close: 5, high: 8, low: 0},
        {count: 80, open: 2, close: 3, high: 10, low: 1},
        {count: 81, open: 5, close: 10, high: 20, low: 3},
        {count: 82, open: 15, close: 20, high: 22, low: 8},
        {count: 83, open: 15, close: 20, high: 30, low: 10},
        {count: 84, open: 20, close: 25, high: 20, low: 10},
        {count: 85, open: 10, close: 13, high: 20, low: 5},
        {count: 86, open: 7, close: 10, high: 20, low: 3},
        {count: 87, open: 9, close: 10, high: 12, low: 2},
        {count: 88, open: 2, close: 5, high: 7, low: 1},
        {count: 89, open: 3, close: 5, high: 8, low: 0},
        {count: 90, open: 2, close: 3, high: 10, low: 1},
        {count: 91, open: 5, close: 10, high: 20, low: 3},
        {count: 92, open: 15, close: 20, high: 22, low: 8},
        {count: 93, open: 15, close: 20, high: 30, low: 10},
        {count: 94, open: 20, close: 25, high: 20, low: 10},
        {count: 95, open: 10, close: 13, high: 20, low: 5},
        {count: 96, open: 7, close: 10, high: 20, low: 3},
        {count: 97, open: 9, close: 10, high: 12, low: 2},
        {count: 98, open: 2, close: 5, high: 7, low: 1},
        {count: 99, open: 3, close: 5, high: 8, low: 0},
        {count: 100, open: 2, close: 3, high: 10, low: 1}
      ]}
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
