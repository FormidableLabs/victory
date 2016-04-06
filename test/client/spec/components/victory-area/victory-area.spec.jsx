/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryArea from "src/components/victory-area/victory-area";
import { VictoryLabel } from "victory-core";
import Area from "src/components/victory-area/area";

describe("victory-area methods", () => {
  describe("getBaseline", () => {
    const data = [
      {x: 1, y: 1}, {x: 2, y: 1}
    ];
    const stackedData = [
      {x: 1, y: 1, yOffset: 1}, {x: 2, y: 1, yOffset: 1}
    ];
    const domain = {x: [0, 10], y: [0, 10]};
    const nonZeroDomain = {x: [0, 10], y: [1, 10]};
    const negativeDomain = {x: [0, 10], y: [-1, 10]};

    it("should return the minimum yOffset is not present", () => {
      const calculatedProps = {domain, data};
      const result = VictoryArea.prototype.getBaseline(calculatedProps);
      const expectedResult = [{y0: 0, x: 1, y: 1}, {y0: 0, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return the domain minimum when it is greater than zero", () => {
      const calculatedProps = {domain: nonZeroDomain, data};
      const result = VictoryArea.prototype.getBaseline(calculatedProps);
      const expectedResult = [{y0: 1, x: 1, y: 1}, {y0: 1, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return zero when the domain minimum is negative", () => {
      const calculatedProps = {domain: negativeDomain, data};
      const result = VictoryArea.prototype.getBaseline(calculatedProps);
      const expectedResult = [{y0: 0, x: 1, y: 1}, {y0: 0, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return yOffset if present", () => {
      const calculatedProps = {domain, data: stackedData};
      const result = VictoryArea.prototype.getBaseline(calculatedProps);
      const expectedResult = [{y0: 1, x: 1, y: 1, yOffset: 1}, {y0: 1, x: 2, y: 1, yOffset: 1}];
      expect(result).to.eql(expectedResult);
    });
  });
});

describe("components/victory-area", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryArea/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal(VictoryArea.defaultProps.width);
      expect(svg.prop("style").height).to.equal(VictoryArea.defaultProps.height);
    });
  });

  describe("event handling", () => {
    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea events={{data: {onClick: clickHandler}}}/>
      );
      const Data = wrapper.find(Area);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.eql(initialProps);
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });

    it("attaches an event to a label", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea label={"okay"} events={{labels: {onClick: clickHandler}}}/>
      );
      const Labels = wrapper.find(VictoryLabel);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.contain({labelText: "okay"});
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });
  });
});
