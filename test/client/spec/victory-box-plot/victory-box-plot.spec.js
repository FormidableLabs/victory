/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks,no-unused-expressions,react/prop-types */
import React from "react";
import { shallow, mount } from "enzyme";
import { VictoryBoxPlot } from "packages/victory-box-plot/src/index";
import { Box } from "packages/victory-core";

const dataset = [
  { x: 1, min: 1, max: 18, median: 8, q1: 5, q3: 15 },
  { x: 2, min: 4, max: 20, median: 10, q1: 7, q3: 15 },
  { x: 3, min: 3, max: 12, median: 6, q1: 5, q3: 10 }
];

const TestGroup = ({ children }) => {
  return <g data-test="testGroup">{children}</g>;
};

describe("components/victory-box-plot", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(<VictoryBoxPlot data={dataset} />);
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(<VictoryBoxPlot data={dataset} />);
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders 3 points", () => {
      const wrapper = shallow(<VictoryBoxPlot data={dataset} />);
      const points = wrapper.find(Box);
      // two boxes per point
      expect(points.length).to.equal(6);
    });
  });

  it("does not render data with null x or y values", () => {
    const data = [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 5 },
      { x: null, y: 2 },
      { x: null, y: 3 },
      { x: null, y: 5 },
      { x: 2, y: null },
      { x: 2, y: null },
      { x: 2, y: null }
    ];
    const wrapper = mount(<VictoryBoxPlot data={data} groupComponent={<TestGroup />} />);
    expect(wrapper.find('[data-test="testGroup"]').length).to.equal(1);
  });

  it("does not render data with null y values when given an array", () => {
    const data = [{ x: 1, y: [1, 2, 3, 5, 8] }, { x: 1, y: [null, 2, 5, 9, 14] }];
    const wrapper = mount(<VictoryBoxPlot data={data} groupComponent={<TestGroup />} />);
    expect(wrapper.find('[data-test="testGroup"]').length).to.equal(1);
  });

  it("does not render data with null min, max, median, q1, or q3 values", () => {
    const data = [
      { x: 1, min: 2, median: 5, max: 10, q1: 3, q3: 7 },
      { x: 2, min: null, median: 4, max: 9, q1: 3, q3: 6 },
      { x: 3, min: 1, median: null, max: 12, q1: 4, q3: 10 },
      { x: 4, min: 3, median: 9, max: null, q1: 5, q3: 13 },
      { x: 5, min: 2, median: 8, max: 15, q1: null, q3: 12 },
      { x: 5, min: 2, median: 10, max: 20, q1: 8, q3: null }
    ];
    const wrapper = mount(<VictoryBoxPlot data={data} groupComponent={<TestGroup />} />);
    expect(wrapper.find('[data-test="testGroup"]').length).to.equal(1);
  });

  describe("accessibility", () => {
    it("adds an aria role to each point in the series", () => {
      const wrapper = mount(<VictoryBoxPlot data={dataset} />);

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
