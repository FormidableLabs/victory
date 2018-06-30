  /**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { omit } from "lodash";
import { shallow, mount } from "enzyme";
import SvgTestHelper from "../../svg-test-helper";
import { VictoryAxis } from "packages/victory-chart/src/index";
import { TextSize } from "packages/victory-core/src/index";

describe("components/victory-axis", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryAxis/>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryAxis/>
      );
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders the appropriate number of ticks", () => {
      const tickValues = [1, 2, 3];
      const wrapper = shallow(
        <VictoryAxis tickValues={tickValues}/>
      );
      const ticks = wrapper.find("[type=\"tick\"]");
      expect(ticks.length).to.equal(tickValues.length);
    });

    it("renders ticks as lines", () => {
      const wrapper = mount(
        <VictoryAxis/>
      );
      const ticks = wrapper.find("[type=\"axis\"]");
      ticks.forEach(SvgTestHelper.expectIsALine);
    });

    it("renders a line", () => {
      const wrapper = mount(
        <VictoryAxis/>
      );
      const line = wrapper.find("[type=\"axis\"]");
      SvgTestHelper.expectIsALine(line);
    });
  });

  describe("dependentAxis prop", () => {
    it("renders a horizontal axis by default", () => {
      const props = { padding: 50, width: 300 };
      const wrapper = mount(
        <VictoryAxis {...props}/>
      );
      const line = wrapper.find("[type=\"axis\"]");
      expect(SvgTestHelper.isHorizontalAxis(line, props)).to.equal(true);
    });

    it("renders a vertical axis if specified", () => {
      const props = { padding: 50, height: 300 };
      const wrapper = mount(
        <VictoryAxis dependentAxis {...props}/>
      );
      const line = wrapper.find("[type=\"axis\"]");
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
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const svg = wrapper.find("svg").at(0);
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
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const Data = wrapper.find("[type=\"axis\"]");
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
  describe("label overlap", () => {
    describe("with empty label widths", () => {
      before(() => {
        sinon.stub(TextSize, "approximateTextSize", () => ({ width: 0, height: 0 }));
      });
      after(() => {
        TextSize.approximateTextSize.restore();
      });

      it("renders the appropriate number of ticks", () => {
        const wrapper = shallow(
          <VictoryAxis tickValues={["", "", ""]} width={10} fixLabelOverlap
            style={{ tickLabels: { padding: 0 } }}
          />
        );
        expect(wrapper.find("[type=\"tick\"]").length).to.equal(3);
      });
    });
    describe("with not empty label widths", () => {
      beforeEach(() => {
        sinon.stub(TextSize, "approximateTextSize", () => ({ width: 30, height: 30 }));
      });

      afterEach(() => {
        TextSize.approximateTextSize.restore();
      });

      it("renders the appropriate number of ticks with default options", () => {
        const wrapper = shallow(
          <VictoryAxis tickValues={["1", "2", "3"]} width={10} />
        );
        expect(wrapper.find("[type=\"tick\"]").length).to.equal(3);
      });
      it("renders the appropriate number of ticks with fixLabelOverlap options", () => {
        const wrapper = shallow(
          <VictoryAxis tickValues={["1", "2", "3"]} width={60} fixLabelOverlap
            style={{ tickLabels: { padding: 0 } }}
          />
        );
        expect(wrapper.find("[type=\"tick\"]").length).to.equal(2);
      });

      it("renders ticks with similar gaps when ticks height sum greater then axis height", () => {
        const wrapper = shallow(
          <VictoryAxis tickValues={["1", "2", "3", "4"]} height={90} fixLabelOverlap dependentAxis
            style={{ tickLabels: { padding: 0 } }}
          />
        );
        const labelTexts = wrapper.find("VictoryLabel").map((tick) => tick.props("text").text);
        expect(labelTexts.filter((text) => text === "1")).to.be.not.empty;
        expect(labelTexts.filter((text) => text === "2")).to.be.empty;
        expect(labelTexts.filter((text) => text === "3")).to.be.not.empty;
        expect(labelTexts.filter((text) => text === "4")).to.be.empty;
      });
      it("renders the appropriate ticks for dependent axis", () => {
        const wrapper = shallow(
          <VictoryAxis dependentAxis fixLabelOverlap
            tickValues={["1", "2", "3"]} height={60}
            style={{ tickLabels: { padding: 0 } }}
          />
        );
        const labelTexts = wrapper.find("VictoryLabel").map((tick) => tick.props("text").text);
        expect(labelTexts.filter((text) => text === "1")).to.be.not.empty;
        expect(labelTexts.filter((text) => text === "2")).to.be.empty;
        expect(labelTexts.filter((text) => text === "3")).to.be.not.empty;
      });
      it("renders the appropriate number of ticks with paddings (number)", () => {
        const wrapper = shallow(
          <VictoryAxis tickValues={["1", "2", "3"]} width={100} fixLabelOverlap
            style={{ tickLabels: { padding: 10 } }}
          />
        );
        expect(wrapper.find("[type=\"tick\"]").length).to.equal(2);
      });
      it("renders the appropriate number of ticks with paddings (object) and dependentAxis", () => {
        const wrapper = shallow(
          <VictoryAxis dependentAxis tickValues={["1", "2", "3"]} height={80} fixLabelOverlap
            style={{ tickLabels: { padding: { top: 10 } } }}
          />
        );
        expect(wrapper.find("[type=\"tick\"]").length).to.equal(2);
      });
    });
  });
});
