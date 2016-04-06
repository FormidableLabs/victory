/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { shallow, mount } from "enzyme";
import _ from "lodash";
import VictoryScatter from "src/components/victory-scatter/victory-scatter";
import Point from "src/components/victory-scatter/point";
import { VictoryLabel } from "victory-core";

class MyPoint extends React.Component {

  render() { }
}

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
    it("renders injected points for {x, y} shaped data (default)", () => {
      const data = _.range(10).map((i) => ({x: i, y: i}));
      const wrapper = shallow(
        <VictoryScatter data={data} dataComponent={<MyPoint />} />
      );

      const points = wrapper.find(MyPoint);
      expect(points.length).to.equal(10);
    });

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

    it("attaches an event to a label", () => {
      const clickHandler = sinon.spy();
      const data = [
        {x: 0, y: 0, label: "0"},
        {x: 1, y: 1, label: "1"},
        {x: 2, y: 2, label: "2"}
      ];
      const wrapper = mount(
        <VictoryScatter data={data} events={{labels: {onClick: clickHandler}}}/>
      );
      const Labels = wrapper.find(VictoryLabel);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1].datum).to.eql(data[index]);
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });
  });
});
