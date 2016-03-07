/**
 * Client tests
 */
 /* global sinon */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryAxis from "src/components/victory-axis/victory-axis";
import AxisLine from "src/components/victory-axis/axis-line";

describe("components/victory-axis", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryAxis/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal(VictoryAxis.defaultProps.width);
      expect(svg.prop("style").height).to.equal(VictoryAxis.defaultProps.height);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the axis line", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryAxis events={{axis: {onClick: clickHandler}}}/>
      );
      wrapper.find(AxisLine).simulate("click");
      expect(clickHandler.calledOnce).to.equal(true);
    });
  });
});
