/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */

import React from "react";
import { shallow, mount } from "enzyme";
import _ from "lodash";
import VictoryBar from "src/components/victory-bar/victory-bar";
import Bar from "src/components/victory-bar/bar";

describe("components/victory-bar", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryBar/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal(VictoryBar.defaultProps.width);
      expect(svg.prop("style").height).to.equal(VictoryBar.defaultProps.height);
    });
  });

  describe("rendering data", () => {
    it("renders bars for {x, y} shaped data (default)", () => {
      const data = _.range(10).map((i) => ({x: i, y: i}));
      const wrapper = shallow(<VictoryBar data={data}/>);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(10);
    });

    it("renders bars for array-shaped data", () => {
      const data = _.range(20).map((i) => [i, i]);
      const wrapper = shallow(<VictoryBar data={data} x={0} y={1}/>);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(20);
    });

    it("renders bars for deeply-nested data", () => {
      const data = _.range(40).map((i) => ({a: {b: [{x: i, y: i}]}}));
      const wrapper = shallow(
        <VictoryBar data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(40);
    });

    it("renders bars values with null accessor", () => {
      const data = _.range(30);
      const wrapper = shallow(
        <VictoryBar data={data} x={null} y={null}/>
      );
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(30);
    });
  });

  describe("event handling", () => {
    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryBar events={{data: {onClick: clickHandler}}}/>
      );
      const Data = wrapper.find(Bar);
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
