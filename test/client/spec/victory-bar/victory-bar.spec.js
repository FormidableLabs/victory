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
import { VictoryBar, Bar } from "packages/victory-bar/src/index";
import { VictoryLabel } from "packages/victory-core";

describe("components/victory-bar", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(<VictoryBar />);
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(<VictoryBar />);
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders 4 bars", () => {
      const wrapper = shallow(<VictoryBar />);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(4);
    });

    it("renders each bar as a rectangle", () => {
      const wrapper = mount(<VictoryBar />);
      const bars = wrapper.find(Bar);
      bars.forEach(SvgTestHelper.expectIsRectangular);
    });
  });

  describe("rendering data", () => {
    it("renders bars for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, y: i }));
      const wrapper = shallow(<VictoryBar data={data} />);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(10);
    });

    it("renders ordered bars when sortKey is passed", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const wrapper = shallow(<VictoryBar data={data} sortKey="x" />);
      const xValues = wrapper.find(Bar).map((bar) => bar.prop("datum")._x);
      expect(xValues).to.eql([0, 1, 2, 3, 4]);
    });

    it("renders reverse ordered bars when sortOrder is descending", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const wrapper = shallow(<VictoryBar data={data} sortKey="x" sortOrder="descending" />);
      const xValues = wrapper.find(Bar).map((bar) => bar.prop("datum")._x);
      expect(xValues).to.eql([4, 3, 2, 1, 0]);
    });

    it("renders bars for array-shaped data", () => {
      const data = range(20).map((i) => [i, i]);
      const wrapper = shallow(<VictoryBar data={data} x={0} y={1} />);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(20);
    });

    it("renders bars for deeply-nested data", () => {
      const data = range(40).map((i) => ({ a: { b: [{ x: i, y: i }] } }));
      const wrapper = shallow(<VictoryBar data={data} x="a.b[0].x" y="a.b[0].y" />);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(40);
    });

    it("renders bars values with null accessor", () => {
      const data = range(30);
      const wrapper = shallow(<VictoryBar data={data} x={null} y={null} />);
      const bars = wrapper.find(Bar);
      expect(bars.length).to.equal(30);
    });

    it("renders bars with appropriate relative heights", () => {
      const wrapper = mount(<VictoryBar data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]} />);
      const bars = wrapper.find(Bar);
      const heights = bars.map(SvgTestHelper.getBarHeight);

      expect(heights[1] / 2).to.be.closeTo(heights[0], 0.5);
      expect((heights[2] / 3) * 2).to.be.closeTo(heights[1], 0.5);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryBar
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
        <VictoryBar
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const Data = wrapper.find(Bar);
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
      const data = [
        { x: 0, y: 0, label: "0" },
        { x: 1, y: 1, label: "1" },
        { x: 2, y: 2, label: "2" }
      ];
      const wrapper = mount(
        <VictoryBar
          data={data}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const Labels = wrapper.find(VictoryLabel);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.contain({ text: `${index}` });
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to each bar in the series", () => {
      const data = range(20).map((y, x) => ({ x, y }));
      const wrapper = mount(<VictoryBar data={data} />);

      wrapper.find("path").forEach((p) => {
        const roleValue = p.prop("role");
        expect(roleValue).to.be.a("string");
        expect(roleValue).to.equal("presentation");
      });
    });
  });
});
