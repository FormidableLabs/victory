/**
 * Client tests
 */
import React from "react";
import ReactDOM from "react-dom";
import VictoryAxis from "src/components/victory-axis/victory-axis";
import AxisLine from "src/components/victory-axis/axis-line";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";
import { shallow, mount } from "enzyme";

const getElement = function (output, tagName) {
  return ReactDOM.findDOMNode(
    TestUtils.findRenderedDOMComponentWithTag(output, tagName)
  );
};

let renderedComponent;

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

    it("renders an svg with the correct width and height", () => {
      const clickHandler = sinon.spy();
      // need to actually mount this node
      const wrapper = mount(
        <VictoryAxis events={{axis: {onClick: clickHandler}}}/>
      );
      const line = wrapper.find(AxisLine).simulate("click");
      expect(clickHandler.calledOnce).to.equal(true);
    });

  });
});
