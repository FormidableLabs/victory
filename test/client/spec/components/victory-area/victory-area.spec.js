/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { range, omit } from "lodash";
import { shallow, mount } from "enzyme";
import SvgTestHelper from "../../../../svg-test-helper";
import VictoryArea from "src/components/victory-area/victory-area";
import { VictoryLabel, Area } from "victory-core";

describe("components/victory-area", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryArea/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewbox", () => {
      const wrapper = mount(
        <VictoryArea/>
      );
      const svg = wrapper.find("svg");
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });
  });

  describe("component rendering with data", () => {
    it("renders the correct d3 path", () => {
      const props = {
        width: 400,
        height: 300,
        padding: 50,
        scale: "linear",
        interpolation: "linear",
        data: [{x: 0, y: 0, y0: 0}, {x: 2, y: 3, y0: 0}, {x: 4, y: 1, y0: 0}]
      };
      const wrapper = shallow(
        <VictoryArea {...props}/>
      );

      const area = wrapper.find(Area);
      SvgTestHelper.expectCorrectD3Path(area, props, "area");
    });

    it.only("sorts data according to sortKey prop", () => {
      const props = {
        scale: "linear",
        interpolation: "linear",
        sortKey: "x",
        data: range(5).map((i) => ({x: i, y: i, y0: 0})).reverse()
      };
      const wrapper = shallow(
        <VictoryArea {...props}/>
      );

      const xValues = wrapper
        .find(Area)
        .first()
        .prop('data')
        .map((datum) => datum._x);
      expect(xValues).to.eql([0, 1, 2, 3, 4]);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea
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
        .to.include.keys("data", "scale", "width", "height", "style");
    });

    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea
          events={[{
            target: "data",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const DataComponent = wrapper.find(Area);
      DataComponent.forEach((node, index) => {
        const initialProps = DataComponent.at(index).props();
        node.simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
      });
    });

    it("attaches an event to a label", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea
          label="okay"
          events={[{
            target: "labels",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const Labels = wrapper.find(VictoryLabel);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.contain({text: "okay"});
      });
    });
  });

  describe("accessibility", () => {
    it("adds an area role to the path area", () => {
      const wrapper = mount(<VictoryArea />);
      wrapper.find("path").nodes.forEach((p) => {
        const {attributes: attr} = p;
        const role = attr.getNamedItem("role");
        if (role) {
          const roleValue = role.value;
          expect(roleValue).to.be.a("string");
          expect(roleValue).to.equal("presentation");
        }
      });
    });
  });
});
