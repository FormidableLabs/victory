/**
 * Client tests
 */
 /* global sinon */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryChart from "src/components/victory-chart/victory-chart";

describe("components/victory-chart", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryChart/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal(VictoryChart.defaultProps.width);
      expect(svg.prop("style").height).to.equal(VictoryChart.defaultProps.height);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent object", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryChart events={{onClick: clickHandler}}/>
      );
      wrapper.find("svg").simulate("click");
      expect(clickHandler.called).to.equal(true);
    });
  });
});
