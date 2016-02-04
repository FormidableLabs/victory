/**
 * Client tests
 */
import React from "react";
import ReactDOM from "react-dom";
import VictoryLine from "src/components/victory-line/victory-line";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html
import TestUtils from "react-addons-test-utils";

const getElement = function (output, tagName) {
  return ReactDOM.findDOMNode(
    TestUtils.findRenderedDOMComponentWithTag(output, tagName)
  );
};

let renderedComponent;

describe("components/victory-line", () => {
  describe("default component rendering", () => {
    before(() => {
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine/>);
    });

    it("renders an svg with the correct width and height", () => {

      const svg = getElement(renderedComponent, "svg");
      // default width and height
      expect(svg.style.width).to.equal(`${VictoryLine.defaultProps.width}px`);
      expect(svg.style.height).to.equal(`${VictoryLine.defaultProps.height}px`);
    });
  });

  describe("rendering with null data", () => {
    it("renders one line segment when there is no null data", () => {
      const data = [
        {x: 1, y: 1},
        {x: 2, y: 4},
        {x: 3, y: 5},
        {x: 4, y: 2},
        {x: 5, y: 3},
        {x: 6, y: 4},
        {x: 7, y: 6}
      ];
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(1);
    });

    it("renders two line segments when there are two continuous sections of data", () => {
      const data = [
        {x: 1, y: 1},
        {x: 2, y: 4},
        {x: 3, y: 5},
        {x: 4, y: 2},
        {x: 5, y: null},
        {x: 6, y: 4},
        {x: 7, y: 6}
      ];
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(2);
    });

    it("renders two lines for two continuous sections of data with multiple nulls", () => {
      const data = [
        {x: 1, y: 1},
        {x: 2, y: 4},
        {x: 3, y: 5},
        {x: 4, y: null},
        {x: 5, y: null},
        {x: 6, y: 4},
        {x: 7, y: 6}
      ];
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(2);
    });

    it("renders two lines for two sections of data with multiple nulls out of order", () => {
      const data = [
        {x: 1, y: 1},
        {x: 2, y: 4},
        {x: 4, y: null},
        {x: 3, y: 5},
        {x: 5, y: null},
        {x: 6, y: 4},
        {x: 7, y: 6}
      ];
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(2);
    });

    it("renders two lines for two sections of data with starting/ending nulls", () => {
      const data = [
        {x: 1, y: null},
        {x: 2, y: 4},
        {x: 3, y: 3},
        {x: 4, y: null},
        {x: 5, y: 2},
        {x: 6, y: 4},
        {x: 7, y: null}
      ];
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(2);
    });

    it("renders three lines for three continuous sections of data", () => {
      const data = [
        {x: 1, y: 2},
        {x: 2, y: 4},
        {x: 3, y: null},
        {x: 4, y: 4},
        {x: 5, y: 2},
        {x: 6, y: null},
        {x: 7, y: 5},
        {x: 8, y: 3}
      ];
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine data={data}/>);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(3);
    });
  });

  describe("rendering with accessors", () => {
    it("renders array-type data", () => {
      const data = [
        [1, 2],
        [3, 4]
      ];
      renderedComponent = TestUtils.renderIntoDocument(<VictoryLine data={data} x={0} y={1} />);
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(1);
    });

    it("renders data values with null accessor", () => {
      const data = [1, 2, 3, 4];
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryLine data={data} x={null} y={null} />
      );
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(1);
    });

    it("renders deeply nested data", () => {
      const data = [
        {a: {b: [{x: 1, y: 2}]}},
        {a: {b: [{x: 3, y: 4}]}}
      ];
      renderedComponent = TestUtils.renderIntoDocument(
        <VictoryLine data={data} x={'a.b[0].x'} y={'a.b.0.y'} />
      );
      const path = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, "path");
      expect(path.length).to.equal(1);
    });
  });
});
