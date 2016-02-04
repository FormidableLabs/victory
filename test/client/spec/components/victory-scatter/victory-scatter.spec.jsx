/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */

import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import VictoryScatter from "src/components/victory-scatter/victory-scatter";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";

const getElement = function (output, tagName) {
  return ReactDOM.findDOMNode(
    TestUtils.findRenderedDOMComponentWithTag(output, tagName)
  );
};

let renderedComponent;

describe("components/victory-scatter", () => {
  describe("default component rendering", () => {
    before(() => {
      renderedComponent = TestUtils.renderIntoDocument(<VictoryScatter/>);
    });

    it("renders an svg with the correct width and height", () => {
      const svg = getElement(renderedComponent, "svg");
      // default width and height
      expect(svg.style.width).to.equal(`${VictoryScatter.defaultProps.width}px`);
      expect(svg.style.height).to.equal(`${VictoryScatter.defaultProps.height}px`);
    });
  });

  describe("rendering data", () => {
    it("renders points for {x, y} shaped data (default)", () => {
      const data = _.range(10).map((i) => ({x: i, y: i}));
      renderedComponent = TestUtils.renderIntoDocument(<VictoryScatter data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(10);
    });

    it("renders points for array-shaped data", () => {
      const data = _.range(20).map((i) => [i, i]);
      renderedComponent = TestUtils.renderIntoDocument(<VictoryScatter data={data} x={0} y={1}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(20);
    });

    it("renders points for deeply-nested data", () => {
      const data = _.range(40).map((i) => ({a: {b: [{x: i, y: i}]}}));
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryScatter data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(40);
    });

    it("renders data values with null accessor", () => {
      const data = _.range(30);
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryScatter data={data} x={null} y={null}/>
      );
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(30);
    });
  });
});
