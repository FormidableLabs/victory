/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks,no-unused-expressions */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryBoxPlot from "src/components/victory-boxplot/victory-boxplot";
import { Box } from "victory-core";

const dataset = [
  { x: 1, min: 1, max: 18, median: 8, q1: 5, q3: 15 },
  { x: 2, min: 4, max: 20, median: 10, q1: 7, q3: 15 },
  { x: 3, min: 3, max: 12, median: 6, q1: 5, q3: 10 }
];

describe("components/victory-boxplot", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryBoxPlot data={dataset}/>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryBoxPlot data={dataset}/>
      );
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders 3 points", () => {
      const wrapper = shallow(
        <VictoryBoxPlot data={dataset}/>
      );
      const points = wrapper.find(Box);
      // two boxes per point
      expect(points.length).to.equal(6);
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to each point in the series", () => {
      const wrapper = mount(
        <VictoryBoxPlot data={dataset} />
      );

      wrapper.find("rect").forEach((r) => {
        const roleValue = r.prop("role");
        if (roleValue) {
          expect(roleValue).to.be.a("string");
          expect(roleValue).to.equal("presentation");
        }
      });
    });
  });
});
