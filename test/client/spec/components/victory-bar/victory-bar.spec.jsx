/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { shallow, mount } from "enzyme";
import omit from "lodash/omit";
import range from "lodash/range";
import VictoryBar from "src/components/victory-bar/victory-bar";
import Bar from "src/components/victory-bar/bar";
import { VictoryLabel } from "victory-core";

describe("components/victory-bar", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryBar/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = shallow(
        <VictoryBar/>
      );
      const svg = wrapper.find("svg");
      const viewBoxValue =
        `0 0 ${VictoryBar.defaultProps.width} ${VictoryBar.defaultProps.height}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });
  });

  describe("rendering data", () => {
    it("renders bars for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({x: i, y: i}));
      const wrapper = shallow(<VictoryBar data={data}/>);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(10);
    });

    it("renders bars for array-shaped data", () => {
      const data = range(20).map((i) => [i, i]);
      const wrapper = shallow(<VictoryBar data={data} x={0} y={1}/>);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(20);
    });

    it("renders bars for deeply-nested data", () => {
      const data = range(40).map((i) => ({a: {b: [{x: i, y: i}]}}));
      const wrapper = shallow(
        <VictoryBar data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(40);
    });

    it("renders bars values with null accessor", () => {
      const data = range(30);
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
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
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
        <VictoryBar data={data} events={{labels: {onClick: clickHandler}}}/>
      );
      const Labels = wrapper.find(VictoryLabel);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.contain({text: `${index}`});
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });
  });
});
