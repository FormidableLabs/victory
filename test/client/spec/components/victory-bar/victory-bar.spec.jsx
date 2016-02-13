/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */

import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import VictoryBar from "src/components/victory-bar/victory-bar";
import Domain from "src/helpers/domain";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";

const getElement = function (output, tagName) {
  return ReactDOM.findDOMNode(
    TestUtils.findRenderedDOMComponentWithTag(output, tagName)
  );
};

let renderedComponent;

describe("components/victory-bar", () => {
  describe("default component rendering", () => {
    before(() => {
      renderedComponent = TestUtils.renderIntoDocument(<VictoryBar/>);
    });

    it("renders an svg with the correct width and height", () => {
      const svg = getElement(renderedComponent, "svg");
      // default width and height
      expect(svg.style.width).to.equal(`${VictoryBar.defaultProps.width}px`);
      expect(svg.style.height).to.equal(`${VictoryBar.defaultProps.height}px`);
    });
  });

  describe("rendering data", () => {
    it("renders bars for {x, y} shaped data (default)", () => {
      const data = _.range(10).map((i) => ({x: i, y: i}));
      renderedComponent = TestUtils.renderIntoDocument(<VictoryBar data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(10);
    });

    it("renders bars for array-shaped data", () => {
      const data = _.range(20).map((i) => [i, i]);
      renderedComponent = TestUtils.renderIntoDocument(<VictoryBar data={data} x={0} y={1}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(20);
    });

    it("renders bars for deeply-nested data", () => {
      const data = _.range(40).map((i) => ({a: {b: [{x: i, y: i}]}}));
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryBar data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(40);
    });

    it("renders bars values with null accessor", () => {
      const data = _.range(30);
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryBar data={data} x={null} y={null}/>
      );
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(30);
    });
  });

  describe("rendering multiple datasets", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "isStacked");
      sandbox.spy(Domain, "shouldGroup");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("renders grouped bars if grouped prop is true", () => {
      const datasets = _.range(3).map(() => _.range(10).map((i) => ({x: i, y: i})));
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryBar grouped data={datasets}/>
      );
      expect(Domain.shouldGroup).called.and.returned(true);
      expect(Domain.isStacked).called.and.returned(false);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(30);
    });

    it("renders stacked bars if stacked prop is true", () => {
      const datasets = _.range(4).map(() => _.range(10).map((i) => ({x: i, y: i})));
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryBar stacked data={datasets}/>
      );
      expect(Domain.shouldGroup).called.and.returned(false);
      expect(Domain.isStacked).called.and.returned(true);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(40);
    });

    it("renders grouped if grouped is undefined, data is 2d array, & default accessors", () => {
      const datasets = _.range(5).map(() => _.range(10).map((i) => ({x: i, y: i})));
      renderedComponent = TestUtils.renderIntoDocument(<VictoryBar data={datasets}/>);
      expect(Domain.shouldGroup).called.and.returned(true);
      expect(Domain.isStacked).called.and.returned(false);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(50);
    });
  });
});
