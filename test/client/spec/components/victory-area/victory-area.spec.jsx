/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */
import React from "react";
import omit from "lodash/omit";
import { shallow, mount } from "enzyme";
import VictoryArea from "src/components/victory-area/victory-area";
import { VictoryLabel } from "victory-core";
import Area from "src/components/victory-area/area";
import Data from "src/helpers/data";

describe("victory-area methods", () => {
  describe("getDataWithBaseline", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.stub(Data, "getData", (props) => props.data);
    });

    afterEach(() => {
      sandbox.restore();
    });

    const data = [
      {x: 1, y: 1}, {x: 2, y: 1}
    ];
    const stackedData = [
      {x: 1, y: 1, yOffset: 1}, {x: 2, y: 1, yOffset: 1}
    ];
    const domain = {x: [0, 10], y: [0, 10]};
    const nonZeroDomain = {x: [0, 10], y: [1, 10]};
    const negativeDomain = {x: [0, 10], y: [-1, 10]};

    it("should return the minimum if yOffset is not present", () => {
      const props = {data};
      const result = VictoryArea.prototype.getDataWithBaseline(props, domain);
      const expectedResult = [{y0: 0, y1: 1, x: 1, y: 1}, {y0: 0, y1: 1, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return the domain minimum when it is greater than zero", () => {
      const props = {data};
      const result = VictoryArea.prototype.getDataWithBaseline(props, nonZeroDomain);
      const expectedResult = [{y0: 1, y1: 1, x: 1, y: 1}, {y0: 1, y1: 1, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return zero when the domain minimum is negative", () => {
      const props = {data};
      const result = VictoryArea.prototype.getDataWithBaseline(props, negativeDomain);
      const expectedResult = [{y0: 0, y1: 1, x: 1, y: 1}, {y0: 0, y1: 1, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return yOffset if present", () => {
      const props = {data: stackedData};
      const result = VictoryArea.prototype.getDataWithBaseline(props, domain);
      const expectedResult = [
        {y0: 1, y1: 2, x: 1, y: 1, yOffset: 1}, {y0: 1, y1: 2, x: 2, y: 1, yOffset: 1}
      ];
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
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewbox", () => {
      const wrapper = shallow(
        <VictoryArea/>
      );
      const svg = wrapper.find("svg");
      const viewBoxValue =
        `0 0 ${VictoryArea.defaultProps.width} ${VictoryArea.defaultProps.height}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });
  });

  describe("event handling", () => {
    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea events={{data: {onClick: clickHandler}}}/>
      );
      const DataComponent = wrapper.find(Area);
      DataComponent.forEach((node, index) => {
        const initialProps = DataComponent.at(index).props();
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
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
        expect(clickHandler.args[index][1]).to.contain({text: "okay"});
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });
  });
});
