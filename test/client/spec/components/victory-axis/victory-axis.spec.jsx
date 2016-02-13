/**
 * Client tests
 */
import React from "react";
import ReactDOM from "react-dom";
import VictoryAxis from "src/components/victory-axis/victory-axis";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";

const getElement = function (output, tagName) {
  return ReactDOM.findDOMNode(
    TestUtils.findRenderedDOMComponentWithTag(output, tagName)
  );
};

let renderedComponent;

describe("components/victory-axis", () => {
  describe("default component rendering", () => {
    before(() => {
      renderedComponent = TestUtils.renderIntoDocument(<VictoryAxis/>);
    });

    it("renders an svg with the correct width and height", () => {

      const svg = getElement(renderedComponent, "svg");
      // default width and height
      expect(svg.style.width).to.equal(`${VictoryAxis.defaultProps.width}px`);
      expect(svg.style.height).to.equal(`${VictoryAxis.defaultProps.height}px`);
    });
  });
});
