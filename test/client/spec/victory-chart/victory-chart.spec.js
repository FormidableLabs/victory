/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { shallow, mount } from "enzyme";
import { VictoryChart } from "packages/victory-chart/src/index";
import { VictoryAxis } from "packages/victory-axis";

describe("components/victory-chart", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(<VictoryChart />);
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(<VictoryChart />);
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });
  });

  describe("axis rendering", () => {
    it("renders two axes by default", () => {
      const wrapper = shallow(<VictoryChart />);
      const axes = wrapper.find(VictoryAxis);
      expect(axes).to.have.lengthOf(2);
    });

    it("renders one axis if one axis is given", () => {
      const wrapper = shallow(
        <VictoryChart>
          <VictoryAxis />
        </VictoryChart>
      );
      const axes = wrapper.find(VictoryAxis);
      expect(axes).to.have.lengthOf(1);
    });

    it("allows axis to control the crossAxis, and offset props", () => {
      const wrapper = shallow(
        <VictoryChart>
          <VictoryAxis crossAxis={false} offsetX={50} offsetY={50} />
        </VictoryChart>
      );
      const axes = wrapper.find(VictoryAxis);
      expect(axes.prop("crossAxis")).to.equal(false);
      expect(axes.prop("offsetX")).to.equal(50);
      expect(axes.prop("offsetY")).to.equal(50);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryChart
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const svg = wrapper.find("svg").at(0);
      svg.simulate("click");
      expect(clickHandler).called;
      // the first argument is the standard evt object
      expect(clickHandler.args[0][1]).to.include.keys("scale", "width", "height", "style");
    });
  });
});
