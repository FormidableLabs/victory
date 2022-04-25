/**
 * Client tests
 */
/* global sinon */
/* eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { range, omit } from "lodash";
import { shallow, mount } from "enzyme";
import { curveCatmullRom } from "victory-vendor/d3-shape";
import SvgTestHelper from "../svg-test-helper";
import { VictoryArea, Area } from "victory-area";
import { VictoryLabel } from "victory-core";

describe("components/victory-area", () => {
  describe("default component rendering", () => {
    it("accepts user props", () => {
      const wrapper = mount(
        <VictoryArea data-testid="victory-area" aria-label="Chart" />
      );

      const svgNode = wrapper.find("svg").at(0).getDOMNode();
      expect(svgNode.getAttribute("data-testid")).to.equal("victory-area");
      expect(svgNode.getAttribute("aria-label")).to.equal("Chart");
    });

    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(<VictoryArea />);
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewbox", () => {
      const wrapper = mount(<VictoryArea />);
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
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
        data: [
          { x: 0, y: 0, y0: 0 },
          { x: 2, y: 3, y0: 0 },
          { x: 4, y: 1, y0: 0 }
        ]
      };
      const wrapper = mount(<VictoryArea {...props} />);
      const area = wrapper.find(Area);
      SvgTestHelper.expectCorrectD3Path(area, props, "area");
    });

    it("renders the correct d3 path with custom interpolation", () => {
      const props = {
        width: 400,
        height: 300,
        padding: 50,
        scale: "linear",
        data: [
          { x: 0, y: 0, y0: 0 },
          { x: 2, y: 3, y0: 0 },
          { x: 4, y: 1, y0: 0 }
        ]
      };
      const stringWrapper = mount(
        <VictoryArea {...props} interpolation="catmullRom" />
      );
      const stringArea = stringWrapper.find(Area);
      const stringPath = stringArea.find("path").prop("d");
      SvgTestHelper.expectCorrectD3Path(
        stringArea,
        { ...props, interpolation: "catmullRom" },
        "area"
      );

      const functionWrapper = mount(
        <VictoryArea {...props} interpolation={curveCatmullRom} />
      );
      const functionArea = functionWrapper.find(Area);
      const functionPath = functionArea.find("path").prop("d");
      SvgTestHelper.expectCorrectD3Path(
        functionArea,
        { ...props, interpolation: curveCatmullRom },
        "area"
      );

      expect(functionPath).to.equal(stringPath);
    });

    it("sorts data according to sortKey prop", () => {
      const props = {
        scale: "linear",
        interpolation: "linear",
        sortKey: "x",
        data: range(5)
          .map((i) => ({ x: i, y: i, y0: 0 }))
          .reverse()
      };
      const wrapper = shallow(<VictoryArea {...props} />);

      const xValues = wrapper
        .find(Area)
        .first()
        .prop("data")
        .map((datum) => datum._x);
      expect(xValues).to.eql([0, 1, 2, 3, 4]);
    });

    it("sorts data according to sortOrder prop", () => {
      const props = {
        scale: "linear",
        interpolation: "linear",
        sortKey: "x",
        sortOrder: "descending",
        data: range(5)
          .map((i) => ({ x: i, y: i, y0: 0 }))
          .reverse()
      };
      const wrapper = shallow(<VictoryArea {...props} />);

      const xValues = wrapper
        .find(Area)
        .first()
        .prop("data")
        .map((datum) => datum._x);
      expect(xValues).to.eql([4, 3, 2, 1, 0]);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea
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
      expect(clickHandler.args[0][1]).to.include.keys(
        "data",
        "scale",
        "width",
        "height",
        "style"
      );
    });

    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const DataComponent = wrapper.find(Area);
      DataComponent.forEach((node, index) => {
        const initialProps = DataComponent.at(index).props();
        node.simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"])).to.eql(
          omit(initialProps, ["events", "key"])
        );
      });
    });

    it("attaches an event to a label", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryArea
          label="okay"
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
        expect(clickHandler.args[index][1]).to.contain({ text: "okay" });
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to the path area", () => {
      const wrapper = mount(<VictoryArea />);
      wrapper.find("path").forEach((p) => {
        const role = p.prop("role");
        if (role) {
          expect(role).to.be.a("string");
          expect(role).to.equal("presentation");
        }
      });
    });

    it("adds aria-label and tabIndex to Area primitive", () => {
      const ariaTestData = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
      ];
      const wrapper = mount(
        <VictoryArea
          data={ariaTestData}
          dataComponent={
            <Area
              ariaLabel={({ data }) => `data point 1's x value is ${data[0].x}`}
              tabIndex={4}
            />
          }
        />
      );

      expect(wrapper.find("path")).to.have.length(1);
      wrapper.find("path").forEach((p, i) => {
        expect(p.prop("aria-label")).to.equal(
          `data point 1's x value is ${ariaTestData[i].x}`
        );
        expect(p.prop("tabIndex")).to.equal(4);
      });
    });
  });
});
