/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks,no-unused-expressions */
import React from "react";
import { shallow, mount } from "enzyme";
import { range, omit } from "lodash";
import VictoryCandlestick from "src/components/victory-candlestick/victory-candlestick";
import { VictoryLabel, Candle } from "victory-core";

class MyCandle extends React.Component {
  render() { }
}

const dataSet = [
  { x: 5, open: 10, close: 20, high: 25, low: 5 },
  { x: 1, open: 80, close: 40, high: 120, low: 10, label: "1" }
];

describe("components/victory-candlestick", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryCandlestick data={dataSet}/>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryCandlestick data={dataSet}/>
      );
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders 8 points", () => {
      const wrapper = shallow(
        <VictoryCandlestick/>
      );
      const points = wrapper.find(Candle);
      expect(points.length).to.equal(8);
    });
  });

  describe("rendering data", () => {
    it("renders injected points for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, open: i, close: i, high: i, low: i }));
      const wrapper = shallow(
        <VictoryCandlestick data={data} dataComponent={<MyCandle />} />
      );

      const points = wrapper.find(MyCandle);
      expect(points.length).to.equal(10);
    });

    it("renders points for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, open: i, close: i, high: i, low: i }));
      const wrapper = shallow(
        <VictoryCandlestick data={data}/>
      );
      const points = wrapper.find(Candle);
      expect(points.length).to.equal(10);
    });

    it("renders points for array-shaped data", () => {
      const data = range(20).map((i) => [i, i, i, i, i]);
      const wrapper = shallow(
        <VictoryCandlestick data={data} x={0} open={1} close={2} high={3} low={4}/>
      );
      const points = wrapper.find(Candle);
      expect(points.length).to.equal(20);
    });

    it("renders points for deeply-nested data", () => {
      const data = range(40).map((i) => ({
        a: { b: [{ x: i, open: i, close: i, high: i, low: i }] }
      }));
      const wrapper = shallow(
        <VictoryCandlestick data={data} x="a.b[0].x"
          open="a.b[0].open"
          close="a.b[0].close"
          high="a.b[0].high"
          low="a.b[0].low"
        />
      );
      const points = wrapper.find(Candle);
      expect(points.length).to.equal(40);
    });

    it("renders data values with null accessor", () => {
      const data = range(30);
      const wrapper = shallow(
        <VictoryCandlestick data={data} x={null} open={null} close={null} high={null} low={null}/>
      );
      const points = wrapper.find(Candle);
      expect(points.length).to.equal(30);
    });
  });

  describe("event handling", () => {
    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryCandlestick
          data={dataSet}
          events={[{
            target: "data",
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const Data = wrapper.find(Candle);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        node.find("rect").simulate("click");
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
        { x: 0, open: 9, close: 30, high: 56, low: 7, label: "0" },
        { x: 1, open: 80, close: 40, high: 120, low: 10, label: "1" },
        { x: 2, open: 50, close: 80, high: 90, low: 20, label: "2" }
      ];
      const wrapper = mount(
        <VictoryCandlestick
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
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.contain({ text: `${index}` });
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });

  describe("accessibility", () => {
    it("adds an area role to each point in the series", () => {
      const data = [
        { x: 0, open: 9, close: 30, high: 56, low: 7 },
        { x: 1, open: 80, close: 40, high: 120, low: 10 },
        { x: 2, open: 50, close: 80, high: 90, low: 20 }
      ];
      const wrapper = mount(
        <VictoryCandlestick data={data} />
      );

      wrapper.find("rect").nodes.forEach((r) => {
        const { attributes: attr } = r;
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
