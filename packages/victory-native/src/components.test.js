import React from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryBoxPlot,
  VictoryBrushLine,
  VictoryCandlestick,
  VictoryChart,
  VictoryContainer,
  VictoryErrorBar,
  VictoryGroup,
  VictoryHistogram,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryPolarAxis,
  VictoryScatter,
  VictoryStack,
  VictoryTooltip,
  VictoryVoronoi,
} from "victory-native";
import { render } from "@testing-library/react-native";

const components = [
  { component: VictoryArea, name: "VictoryArea" },
  { component: VictoryAxis, name: "VictoryAxis" },
  { component: VictoryPolarAxis, name: "VictoryPolarAxis" },
  { component: VictoryBar, name: "VictoryBar" },
  { component: VictoryBoxPlot, name: "VictoryBoxPlot" },
  { component: VictoryBrushLine, name: "VictoryBrushLine" },
  { component: VictoryCandlestick, name: "VictoryCandlestick" },
  { component: VictoryChart, name: "VictoryChart" },
  { component: VictoryContainer, name: "VictoryContainer" },
  { component: VictoryErrorBar, name: "VictoryErrorBar" },
  { component: VictoryGroup, name: "VictoryGroup" },
  { component: VictoryHistogram, name: "VictoryHistogram" },
  { component: VictoryLabel, name: "VictoryLabel" },
  { component: VictoryLine, name: "VictoryLine" },
  { component: VictoryPie, name: "VictoryPie" },
  { component: VictoryScatter, name: "VictoryScatter" },
  { component: VictoryStack, name: "VictoryStack" },
  { component: VictoryTooltip, name: "VictoryTooltip" },
  { component: VictoryVoronoi, name: "VictoryVoronoi" },
];

describe("Default render", () => {
  beforeEach(() => {
    // This suppresses the warning `renderInPortal` is not supported outside of `VictoryContainer`.
    jest.spyOn(console, "warn").mockImplementation((message) => {
      if (message.includes("renderInPortal")) {
        return;
      }
      /* eslint-disable no-console */
      console.warn(message);
    });
  });

  components.forEach((C) => {
    it(`should work for ${C.name}`, () => {
      const { container } = render(React.createElement(C.component));
      expect(container).toBeDefined();
    });
  });
});
