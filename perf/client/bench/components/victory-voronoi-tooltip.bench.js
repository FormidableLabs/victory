import React from "react";
import ReactDOM from "react-dom";
import VictoryVoronoiTooltip from "src/components/victory-voronoi-tooltip/victory-voronoi-tooltip";
import VictoryChart from "src/components/victory-chart/victory-chart";
import VictoryGroup from "src/components/victory-group/victory-group";
import VictoryStack from "src/components/victory-stack/victory-stack";
import { element, suiteOpts } from "../bench-helpers.js";

suite("<VictoryVoronoiTooltip> data", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      data={[
        {x: 10, y: 10, label: "1"},
        {x: 20, y: 50, label: "2"},
        {x: 30, y: 20, label: "3"},
        {x: 40, y: 70, label: "4"},
        {x: 50, y: 10, label: "5"},
        {x: 60, y: 20, label: "6"},
        {x: 70, y: 36, label: "7"},
        {x: 80, y: 32, label: "8"},
        {x: 90, y: 29, label: "9"},
        {x: 100, y: 78, label: "10"}
      ]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      data={[
        {x: 10, y: 10, label: "1"},
        {x: 20, y: 50, label: "2"},
        {x: 30, y: 20, label: "3"},
        {x: 40, y: 70, label: "4"},
        {x: 50, y: 10, label: "5"},
        {x: 60, y: 20, label: "6"},
        {x: 70, y: 36, label: "7"},
        {x: 80, y: 32, label: "8"},
        {x: 90, y: 29, label: "9"},
        {x: 100, y: 78, label: "10"},
        {x: 11, y: 10, label: "11"},
        {x: 21, y: 50, label: "12"},
        {x: 31, y: 20, label: "13"},
        {x: 41, y: 70, label: "14"},
        {x: 51, y: 10, label: "15"},
        {x: 61, y: 20, label: "16"},
        {x: 71, y: 36, label: "17"},
        {x: 81, y: 32, label: "18"},
        {x: 91, y: 29, label: "19"},
        {x: 110, y: 78, label: "20"},
        {x: 12, y: 10, label: "21"},
        {x: 22, y: 50, label: "22"},
        {x: 32, y: 20, label: "23"},
        {x: 42, y: 70, label: "24"},
        {x: 52, y: 10, label: "25"},
        {x: 62, y: 20, label: "26"},
        {x: 72, y: 36, label: "27"},
        {x: 82, y: 32, label: "28"},
        {x: 92, y: 29, label: "29"},
        {x: 120, y: 78, label: "30"},
        {x: 13, y: 10, label: "31"},
        {x: 23, y: 50, label: "32"},
        {x: 33, y: 20, label: "33"},
        {x: 43, y: 70, label: "34"},
        {x: 53, y: 10, label: "35"},
        {x: 63, y: 20, label: "36"},
        {x: 73, y: 36, label: "37"},
        {x: 83, y: 32, label: "38"},
        {x: 93, y: 29, label: "39"},
        {x: 130, y: 78, label: "40"},
        {x: 14, y: 10, label: "41"},
        {x: 24, y: 50, label: "42"},
        {x: 34, y: 20, label: "43"},
        {x: 44, y: 70, label: "44"},
        {x: 54, y: 10, label: "45"},
        {x: 64, y: 20, label: "46"},
        {x: 74, y: 36, label: "47"},
        {x: 84, y: 32, label: "48"},
        {x: 94, y: 29, label: "49"},
        {x: 140, y: 78, label: "50"}
      ]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      data={[
        {x: 10, y: 10, label: "1"},
        {x: 20, y: 50, label: "2"},
        {x: 30, y: 20, label: "3"},
        {x: 40, y: 70, label: "4"},
        {x: 50, y: 10, label: "5"},
        {x: 60, y: 20, label: "6"},
        {x: 70, y: 36, label: "7"},
        {x: 80, y: 32, label: "8"},
        {x: 90, y: 29, label: "9"},
        {x: 100, y: 78, label: "10"},
        {x: 11, y: 10, label: "11"},
        {x: 21, y: 50, label: "12"},
        {x: 31, y: 20, label: "13"},
        {x: 41, y: 70, label: "14"},
        {x: 51, y: 10, label: "15"},
        {x: 61, y: 20, label: "16"},
        {x: 71, y: 36, label: "17"},
        {x: 81, y: 32, label: "18"},
        {x: 91, y: 29, label: "19"},
        {x: 110, y: 78, label: "20"},
        {x: 12, y: 10, label: "21"},
        {x: 22, y: 50, label: "22"},
        {x: 32, y: 20, label: "23"},
        {x: 42, y: 70, label: "24"},
        {x: 52, y: 10, label: "25"},
        {x: 62, y: 20, label: "26"},
        {x: 72, y: 36, label: "27"},
        {x: 82, y: 32, label: "28"},
        {x: 92, y: 29, label: "29"},
        {x: 120, y: 78, label: "30"},
        {x: 13, y: 10, label: "31"},
        {x: 23, y: 50, label: "32"},
        {x: 33, y: 20, label: "33"},
        {x: 43, y: 70, label: "34"},
        {x: 53, y: 10, label: "35"},
        {x: 63, y: 20, label: "36"},
        {x: 73, y: 36, label: "37"},
        {x: 83, y: 32, label: "38"},
        {x: 93, y: 29, label: "39"},
        {x: 130, y: 78, label: "40"},
        {x: 14, y: 10, label: "41"},
        {x: 24, y: 50, label: "42"},
        {x: 34, y: 20, label: "43"},
        {x: 44, y: 70, label: "44"},
        {x: 54, y: 10, label: "45"},
        {x: 64, y: 20, label: "46"},
        {x: 74, y: 36, label: "47"},
        {x: 84, y: 32, label: "48"},
        {x: 94, y: 29, label: "49"},
        {x: 140, y: 78, label: "50"},
        {x: 15, y: 10, label: "51"},
        {x: 25, y: 50, label: "52"},
        {x: 35, y: 20, label: "53"},
        {x: 45, y: 70, label: "54"},
        {x: 55, y: 10, label: "55"},
        {x: 65, y: 20, label: "56"},
        {x: 75, y: 36, label: "57"},
        {x: 85, y: 32, label: "58"},
        {x: 95, y: 29, label: "59"},
        {x: 150, y: 78, label: "60"},
        {x: 16, y: 10, label: "61"},
        {x: 26, y: 50, label: "62"},
        {x: 36, y: 20, label: "63"},
        {x: 46, y: 70, label: "64"},
        {x: 56, y: 10, label: "65"},
        {x: 66, y: 20, label: "66"},
        {x: 76, y: 36, label: "67"},
        {x: 86, y: 32, label: "68"},
        {x: 96, y: 29, label: "69"},
        {x: 160, y: 78, label: "70"},
        {x: 17, y: 10, label: "71"},
        {x: 27, y: 50, label: "72"},
        {x: 37, y: 20, label: "73"},
        {x: 47, y: 70, label: "74"},
        {x: 57, y: 10, label: "75"},
        {x: 67, y: 20, label: "76"},
        {x: 77, y: 36, label: "77"},
        {x: 87, y: 32, label: "78"},
        {x: 97, y: 29, label: "79"},
        {x: 170, y: 78, label: "80"},
        {x: 18, y: 10, label: "81"},
        {x: 28, y: 50, label: "82"},
        {x: 38, y: 20, label: "83"},
        {x: 48, y: 70, label: "84"},
        {x: 58, y: 10, label: "85"},
        {x: 68, y: 20, label: "86"},
        {x: 78, y: 36, label: "87"},
        {x: 88, y: 32, label: "88"},
        {x: 98, y: 29, label: "89"},
        {x: 180, y: 78, label: "90"},
        {x: 19, y: 10, label: "91"},
        {x: 29, y: 50, label: "92"},
        {x: 39, y: 20, label: "93"},
        {x: 49, y: 70, label: "94"},
        {x: 59, y: 10, label: "95"},
        {x: 69, y: 20, label: "96"},
        {x: 79, y: 36, label: "97"},
        {x: 89, y: 32, label: "98"},
        {x: 99, y: 29, label: "99"},
        {x: 190, y: 78, label: "100"}
      ]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryVoronoiTooltip> clipPath", () => {
  benchmark("10 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      size={10}
      data={[
        {x: 10, y: 10, label: "1"},
        {x: 20, y: 50, label: "2"},
        {x: 30, y: 20, label: "3"},
        {x: 40, y: 70, label: "4"},
        {x: 50, y: 10, label: "5"},
        {x: 60, y: 20, label: "6"},
        {x: 70, y: 36, label: "7"},
        {x: 80, y: 32, label: "8"},
        {x: 90, y: 29, label: "9"},
        {x: 100, y: 78, label: "10"}
      ]}
    />, element)
  );

  benchmark("50 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      size={10}
      data={[
        {x: 10, y: 10, label: "1"},
        {x: 20, y: 50, label: "2"},
        {x: 30, y: 20, label: "3"},
        {x: 40, y: 70, label: "4"},
        {x: 50, y: 10, label: "5"},
        {x: 60, y: 20, label: "6"},
        {x: 70, y: 36, label: "7"},
        {x: 80, y: 32, label: "8"},
        {x: 90, y: 29, label: "9"},
        {x: 100, y: 78, label: "10"},
        {x: 11, y: 10, label: "11"},
        {x: 21, y: 50, label: "12"},
        {x: 31, y: 20, label: "13"},
        {x: 41, y: 70, label: "14"},
        {x: 51, y: 10, label: "15"},
        {x: 61, y: 20, label: "16"},
        {x: 71, y: 36, label: "17"},
        {x: 81, y: 32, label: "18"},
        {x: 91, y: 29, label: "19"},
        {x: 110, y: 78, label: "20"},
        {x: 12, y: 10, label: "21"},
        {x: 22, y: 50, label: "22"},
        {x: 32, y: 20, label: "23"},
        {x: 42, y: 70, label: "24"},
        {x: 52, y: 10, label: "25"},
        {x: 62, y: 20, label: "26"},
        {x: 72, y: 36, label: "27"},
        {x: 82, y: 32, label: "28"},
        {x: 92, y: 29, label: "29"},
        {x: 120, y: 78, label: "30"},
        {x: 13, y: 10, label: "31"},
        {x: 23, y: 50, label: "32"},
        {x: 33, y: 20, label: "33"},
        {x: 43, y: 70, label: "34"},
        {x: 53, y: 10, label: "35"},
        {x: 63, y: 20, label: "36"},
        {x: 73, y: 36, label: "37"},
        {x: 83, y: 32, label: "38"},
        {x: 93, y: 29, label: "39"},
        {x: 130, y: 78, label: "40"},
        {x: 14, y: 10, label: "41"},
        {x: 24, y: 50, label: "42"},
        {x: 34, y: 20, label: "43"},
        {x: 44, y: 70, label: "44"},
        {x: 54, y: 10, label: "45"},
        {x: 64, y: 20, label: "46"},
        {x: 74, y: 36, label: "47"},
        {x: 84, y: 32, label: "48"},
        {x: 94, y: 29, label: "49"},
        {x: 140, y: 78, label: "50"}
      ]}
    />, element)
  );

  benchmark("100 pts", () => ReactDOM.render(
    <VictoryVoronoiTooltip
      size={10}
      data={[
        {x: 10, y: 10, label: "1"},
        {x: 20, y: 50, label: "2"},
        {x: 30, y: 20, label: "3"},
        {x: 40, y: 70, label: "4"},
        {x: 50, y: 10, label: "5"},
        {x: 60, y: 20, label: "6"},
        {x: 70, y: 36, label: "7"},
        {x: 80, y: 32, label: "8"},
        {x: 90, y: 29, label: "9"},
        {x: 100, y: 78, label: "10"},
        {x: 11, y: 10, label: "11"},
        {x: 21, y: 50, label: "12"},
        {x: 31, y: 20, label: "13"},
        {x: 41, y: 70, label: "14"},
        {x: 51, y: 10, label: "15"},
        {x: 61, y: 20, label: "16"},
        {x: 71, y: 36, label: "17"},
        {x: 81, y: 32, label: "18"},
        {x: 91, y: 29, label: "19"},
        {x: 110, y: 78, label: "20"},
        {x: 12, y: 10, label: "21"},
        {x: 22, y: 50, label: "22"},
        {x: 32, y: 20, label: "23"},
        {x: 42, y: 70, label: "24"},
        {x: 52, y: 10, label: "25"},
        {x: 62, y: 20, label: "26"},
        {x: 72, y: 36, label: "27"},
        {x: 82, y: 32, label: "28"},
        {x: 92, y: 29, label: "29"},
        {x: 120, y: 78, label: "30"},
        {x: 13, y: 10, label: "31"},
        {x: 23, y: 50, label: "32"},
        {x: 33, y: 20, label: "33"},
        {x: 43, y: 70, label: "34"},
        {x: 53, y: 10, label: "35"},
        {x: 63, y: 20, label: "36"},
        {x: 73, y: 36, label: "37"},
        {x: 83, y: 32, label: "38"},
        {x: 93, y: 29, label: "39"},
        {x: 130, y: 78, label: "40"},
        {x: 14, y: 10, label: "41"},
        {x: 24, y: 50, label: "42"},
        {x: 34, y: 20, label: "43"},
        {x: 44, y: 70, label: "44"},
        {x: 54, y: 10, label: "45"},
        {x: 64, y: 20, label: "46"},
        {x: 74, y: 36, label: "47"},
        {x: 84, y: 32, label: "48"},
        {x: 94, y: 29, label: "49"},
        {x: 140, y: 78, label: "50"},
        {x: 15, y: 10, label: "51"},
        {x: 25, y: 50, label: "52"},
        {x: 35, y: 20, label: "53"},
        {x: 45, y: 70, label: "54"},
        {x: 55, y: 10, label: "55"},
        {x: 65, y: 20, label: "56"},
        {x: 75, y: 36, label: "57"},
        {x: 85, y: 32, label: "58"},
        {x: 95, y: 29, label: "59"},
        {x: 150, y: 78, label: "60"},
        {x: 16, y: 10, label: "61"},
        {x: 26, y: 50, label: "62"},
        {x: 36, y: 20, label: "63"},
        {x: 46, y: 70, label: "64"},
        {x: 56, y: 10, label: "65"},
        {x: 66, y: 20, label: "66"},
        {x: 76, y: 36, label: "67"},
        {x: 86, y: 32, label: "68"},
        {x: 96, y: 29, label: "69"},
        {x: 160, y: 78, label: "70"},
        {x: 17, y: 10, label: "71"},
        {x: 27, y: 50, label: "72"},
        {x: 37, y: 20, label: "73"},
        {x: 47, y: 70, label: "74"},
        {x: 57, y: 10, label: "75"},
        {x: 67, y: 20, label: "76"},
        {x: 77, y: 36, label: "77"},
        {x: 87, y: 32, label: "78"},
        {x: 97, y: 29, label: "79"},
        {x: 170, y: 78, label: "80"},
        {x: 18, y: 10, label: "81"},
        {x: 28, y: 50, label: "82"},
        {x: 38, y: 20, label: "83"},
        {x: 48, y: 70, label: "84"},
        {x: 58, y: 10, label: "85"},
        {x: 68, y: 20, label: "86"},
        {x: 78, y: 36, label: "87"},
        {x: 88, y: 32, label: "88"},
        {x: 98, y: 29, label: "89"},
        {x: 180, y: 78, label: "90"},
        {x: 19, y: 10, label: "91"},
        {x: 29, y: 50, label: "92"},
        {x: 39, y: 20, label: "93"},
        {x: 49, y: 70, label: "94"},
        {x: 59, y: 10, label: "95"},
        {x: 69, y: 20, label: "96"},
        {x: 79, y: 36, label: "97"},
        {x: 89, y: 32, label: "98"},
        {x: 99, y: 29, label: "99"},
        {x: 190, y: 78, label: "100"}
      ]}
    />, element)
  );
}, suiteOpts);

suite("<VictoryVoronoiTooltip> wrapped in <VictoryChart>", () => {
  benchmark("unwrapped <VictoryVoronoiTooltip>",
    () => ReactDOM.render(<VictoryVoronoiTooltip />, element));
  benchmark("wrapped by <VictoryChart>", () => ReactDOM.render(
    <VictoryChart>
      <VictoryVoronoiTooltip />
    </VictoryChart>, element));
}, suiteOpts);

suite("<VictoryVoronoiTooltip> wrapped in <VictoryGroup>", () => {
  benchmark("unwrapped <VictoryVoronoiTooltip>",
    () => ReactDOM.render(<VictoryVoronoiTooltip />, element));
  benchmark("wrapped by <VictoryGroup>", () => ReactDOM.render(
    <VictoryGroup>
      <VictoryVoronoiTooltip />
    </VictoryGroup>, element));
}, suiteOpts);

suite("<VictoryVoronoiTooltip> wrapped in <VictoryStack>", () => {
  benchmark("unwrapped <VictoryVoronoiTooltip>",
    () => ReactDOM.render(<VictoryVoronoiTooltip />, element));
  benchmark("wrapped by <VictoryStack>", () => ReactDOM.render(
    <VictoryStack>
      <VictoryVoronoiTooltip />
    </VictoryStack>, element));
}, suiteOpts);
