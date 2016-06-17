/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { omit } from "lodash";
import { shallow, mount } from "enzyme";
import SvgTestHelper from "../../../../svg-test-helper";
import VictoryAxis from "src/components/victory-axis/victory-axis";
import AxisLine from "src/components/victory-axis/axis-line";
import Tick from "src/components/victory-axis/tick";

describe("components/victory-axis", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryAxis/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryAxis/>
      );
      const svg = wrapper.find("svg");
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders the appropriate number of ticks", () => {
      const tickValues = [1, 2, 3];
      const wrapper = shallow(
        <VictoryAxis tickValues={tickValues}/>
      );
      const ticks = wrapper.find(Tick);
      expect(ticks.length).to.equal(tickValues.length);
    });

    it("renders ticks as lines", () => {
      const wrapper = shallow(
        <VictoryAxis/>
      );
      const ticks = wrapper.find(Tick);
      ticks.forEach(SvgTestHelper.expectIsALine);
    });

    it("renders a line", () => {
      const wrapper = shallow(
        <VictoryAxis/>
      );
      const line = wrapper.find(AxisLine);
      SvgTestHelper.expectIsALine(line);
    });
  });

  describe("dependentAxis prop", () => {
    it("renders a horizontal axis by default", () => {
      const props = {padding: 50, width: 300};
      const wrapper = shallow(
        <VictoryAxis {...props}/>
      );
      const line = wrapper.find(AxisLine);
      expect(SvgTestHelper.isHorizontalAxis(line, props)).to.equal(true);
    });

    it("renders a vertical axis if specified", () => {
      const props = {padding: 50, height: 300};
      const wrapper = shallow(
        <VictoryAxis dependentAxis {...props}/>
      );
      const line = wrapper.find(AxisLine);
      expect(SvgTestHelper.isVerticalAxis(line, props)).to.equal(true);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryAxis
          events={[{
            target: "parent",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const svg = wrapper.find("svg");
      svg.simulate("click");
      expect(clickHandler).called;
      // the first argument is the standard evt object
      expect(clickHandler.args[0][1])
        .to.include.keys("ticks", "scale", "width", "height", "style");
    });

    it("attaches an event to the axis line", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryAxis
          events={[{
            target: "axis",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const Data = wrapper.find(AxisLine);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });
});
