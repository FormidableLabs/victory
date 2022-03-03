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
  VictoryVoronoi
} from "victory-native";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

enzyme.configure({ adapter: new Adapter() });

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
  { component: VictoryVoronoi, name: "VictoryVoronoi" }
];

describe("Default render", () => {
  components.forEach((C) => {
    it(`should work for ${C.name}`, () => {
      const wrapper = enzyme.shallow(React.createElement(C.component));
      expect(wrapper).toHaveLength(1);
    });
  });
});
