/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
import React from "react";
import { shallow, mount } from "enzyme";
import _ from "lodash";
import VictoryScatter from "src/components/victory-scatter/victory-scatter";
import Point from "src/components/victory-scatter/point";

describe("components/victory-scatter", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryScatter/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal(VictoryScatter.defaultProps.width);
      expect(svg.prop("style").height).to.equal(VictoryScatter.defaultProps.height);
    });
  });

  describe("rendering data", () => {
    it("renders points for {x, y} shaped data (default)", () => {
      const data = _.range(10).map((i) => ({x: i, y: i}));
      const wrapper = shallow(
        <VictoryScatter data={data}/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(10);
    });

    it("renders points for array-shaped data", () => {
      const data = _.range(20).map((i) => [i, i]);
      const wrapper = shallow(
        <VictoryScatter data={data} x={0} y={1}/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(20);
    });

    it("renders points for deeply-nested data", () => {
      const data = _.range(40).map((i) => ({a: {b: [{x: i, y: i}]}}));
      const wrapper = shallow(
        <VictoryScatter data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(40);
    });

    it("renders data values with null accessor", () => {
      const data = _.range(30);
      const wrapper = shallow(
        <VictoryScatter data={data} x={null} y={null}/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(30);
    });
  });

  describe("event handling", () => {
    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryScatter events={{data: {onClick: clickHandler}}}/>
      );
      const Data = wrapper.find(Point);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.eql(initialProps);
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });
  });
});
