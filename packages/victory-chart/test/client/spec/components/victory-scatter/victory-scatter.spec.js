/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { shallow, mount } from "enzyme";
import { omit, range } from "lodash";
import SvgTestHelper from "../../../../svg-test-helper";
import VictoryScatter from "src/components/victory-scatter/victory-scatter";
import { VictoryLabel, Point } from "victory-core";

class MyPoint extends React.Component {
  render() { }
}

describe("components/victory-scatter", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryScatter/>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryScatter/>
      );
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders 51 points", () => {
      const wrapper = shallow(
        <VictoryScatter/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(51);
    });

    it("renders each point as a circle", () => {
      const wrapper = mount(
        <VictoryScatter/>
      );
      const points = wrapper.find(Point);
      points.forEach(SvgTestHelper.expectIsCircular);
    });
  });

  describe("rendering data", () => {
    it("renders injected points for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, y: i }));
      const wrapper = shallow(
        <VictoryScatter data={data} dataComponent={<MyPoint />} />
      );

      const points = wrapper.find(MyPoint);
      expect(points.length).to.equal(10);
    });

    it("renders points for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, y: i }));
      const wrapper = shallow(
        <VictoryScatter data={data}/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(10);
    });

    it("sorts data by sortKey prop", () => {
      const data = range(5).map((i) => ({ x: i, y: i })).reverse();
      const wrapper = shallow(
        <VictoryScatter data={data} sortKey="x"/>
      );
      const xValues = wrapper.find(Point).map((point) => point.prop("datum")._x);
      expect(xValues).to.eql([0, 1, 2, 3, 4]);
    });

    it("reverses sorted data with the sortOrder prop", () => {
      const data = range(5).map((i) => ({ x: i, y: i })).reverse();
      const wrapper = shallow(
        <VictoryScatter data={data} sortKey="x" sortOrder="descending"/>
      );
      const xValues = wrapper.find(Point).map((point) => point.prop("datum")._x);
      expect(xValues).to.eql([4, 3, 2, 1, 0]);
    });

    it("renders points for array-shaped data", () => {
      const data = range(20).map((i) => [i, i]);
      const wrapper = shallow(
        <VictoryScatter data={data} x={0} y={1}/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(20);
    });

    it("renders points for deeply-nested data", () => {
      const data = range(40).map((i) => ({ a: { b: [{ x: i, y: i }] } }));
      const wrapper = shallow(
        <VictoryScatter data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(40);
    });

    it("renders data values with null accessor", () => {
      const data = range(30);
      const wrapper = shallow(
        <VictoryScatter data={data} x={null} y={null}/>
      );
      const points = wrapper.find(Point);
      expect(points.length).to.equal(30);
    });

    it("renders points in the correct positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const wrapper = mount(
        <VictoryScatter
          data={[{ x: 0, y: 0 }, { x: 2, y: 3 }, { x: 5, y: 5 }]}
          {...svgDimensions}
        />
      );
      const domain = { x: [0, 5], y: [0, 5] };

      const points = wrapper.find(Point);
      const svgCoordinates = points.map(SvgTestHelper.getSvgPointCoordinates);
      const coordinates = svgCoordinates.map((coord) => {
        return SvgTestHelper.convertSvgCoordinatesToCartesian(
          coord,
          svgDimensions,
          domain
        );
      });

      expect(coordinates).to.eql([[0, 0], [2, 3], [5, 5]]);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryScatter
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
        .to.include.keys("data", "scale", "width", "height", "style");
    });

    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryScatter
          events={[{
            target: "data",
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const Data = wrapper.find(Point);
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

    it("attaches an event to a label", () => {
      const clickHandler = sinon.spy();
      const data = [
        { eventKey: 0, _x: 0, _y: 0, x: 0, y: 0, label: "0" },
        { eventKey: 1, _x: 1, _y: 1, x: 1, y: 1, label: "1" },
        { eventKey: 2, _x: 2, _y: 2, x: 2, y: 2, label: "2" }
      ];
      const wrapper = mount(
        <VictoryScatter
          data={data}
          events={[{
            target: "labels",
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const Labels = wrapper.find(VictoryLabel);
      Labels.forEach((node, index) => {
        node.childAt(0).simulate("click");
        expect(clickHandler).called;
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1].datum).to.eql(data[index]);
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });


  describe("accessibility", () => {
    it("adds an aria role to each point in the series", () => {
      const data = range(20).map((y, x) => ({ x, y }));
      const wrapper = mount(<VictoryScatter data={data} />);

      wrapper.find("path").forEach((p) => {
        const roleValue = p.prop("role");
        expect(roleValue).to.be.a("string");
        expect(roleValue).to.equal("presentation");
      });
    });
  });
});
