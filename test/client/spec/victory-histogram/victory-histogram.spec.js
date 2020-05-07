/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { shallow, mount } from "enzyme";
import { omit, range } from "lodash";
import SvgTestHelper from "../svg-test-helper";
import { VictoryHistogram } from "packages/victory-histogram/src/index";

describe("components/victory-histogram", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(<VictoryHistogram />);
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(<VictoryHistogram />);
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders 0 bars", () => {
      const wrapper = shallow(<VictoryHistogram />);
      const bars = wrapper.find("Bar");
      expect(bars.length).to.equal(0);
    });

    it("renders 4 bars", () => {
      const wrapper = shallow(<VictoryHistogram bins={[0, 10, 40, 50, 100]} />);
      const bars = wrapper.find("Bar");
      expect(bars.length).to.equal(4);
    });

    it("renders each bar as a rectangle", () => {
      const wrapper = mount(<VictoryHistogram bins={[0, 10, 40, 50]} />);
      const bars = wrapper.find("Bar");
      bars.forEach(SvgTestHelper.expectIsRectangular);
    });
  });

  describe("rendering data", () => {
    it("renders bars for {x} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i }));
      const wrapper = shallow(<VictoryHistogram data={data} />);
      const bars = wrapper.find("Bar");
      expect(bars.length).to.be.greaterThan(0);
    });

    it("renders bars for deeply-nested data", () => {
      const data = range(10).map((i) => ({ a: { b: [{ x: i }] } }));
      const wrapper = shallow(<VictoryHistogram data={data} x="a.b[0].x" />);
      const bars = wrapper.find("Bar");
      expect(bars.length).to.be.greaterThan(0);
    });

    it("renders bars values with null accessor", () => {
      const data = range(30);
      const wrapper = shallow(<VictoryHistogram data={data} x={null} y={null} />);
      const bars = wrapper.find("Bar");
      expect(bars.length).to.be.greaterThan(0);
    });

    it("renders bars with appropriate relative heights", () => {
      const wrapper = mount(
        <VictoryHistogram
          data={[{ x: 1 }, { x: 2 }, { x: 2 }, { x: 3 }, { x: 3 }, { x: 3 }]}
          bins={[1, 2, 3, 4]}
        />
      );
      const bars = wrapper.find("Bar");
      const heights = bars.map(SvgTestHelper.getBarHeight);

      expect(heights[1] / 2).to.be.closeTo(heights[0], 0.5);
      expect((heights[2] * 2) / 3).to.be.closeTo(heights[1], 0.5);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryHistogram
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
      expect(clickHandler.args[0][1]).to.include.keys("data", "scale", "width", "height", "style");
    });

    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryHistogram
          data={[{ x: 1 }, { x: 1 }, { x: 2 }]}
          bins={[1, 2, 3]}
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );

      const Data = wrapper.find("Bar");
      expect(Data).to.have.lengthOf(2);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"])).to.eql(
          omit(initialProps, ["events", "key"])
        );
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });

    it("attaches an event to a label", () => {
      const clickHandler = sinon.spy();
      const data = [{ x: 0 }, { x: 1 }, { x: 2 }];
      const wrapper = mount(
        <VictoryHistogram
          data={data}
          bins={[0, 1, 2, 3]}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
          labels={({ datum }) => `${datum.index}`}
        />
      );

      const Labels = wrapper.find("VictoryLabel");
      expect(Labels).to.have.lengthOf(3);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(typeof clickHandler.args[index][1].text === "function").to.eql(true);
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to each bar in the series", () => {
      const data = range(20).map((x) => ({ x }));
      const wrapper = mount(<VictoryHistogram data={data} />);

      wrapper.find("path").forEach((p) => {
        const roleValue = p.prop("role");
        expect(roleValue).to.be.a("string");
        expect(roleValue).to.equal("presentation");
      });
    });
  });
});
