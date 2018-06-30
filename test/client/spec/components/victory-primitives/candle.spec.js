import React from "react";
import { shallow } from "enzyme";
import Candle from "packages/victory-core/src/victory-primitives/candle";
import Line from "packages/victory-core/src/victory-primitives/line";
import Rect from "packages/victory-core/src/victory-primitives/rect";
import { merge } from "lodash";

describe("victory-primitives/candle", () => {
  const baseProps = {
    data: [
      { x: 1, open: 10, close: 30, high: 50, low: 5, eventKey: 0 },
      { x: 2, open: 40, close: 80, high: 100, low: 10, eventKey: 1 }
    ],
    datum: { x: 1, open: 10, close: 30, high: 50, low: 5, eventKey: 0 },
    x: 5,
    high: 50,
    low: 5,
    close: 30,
    open: 10,
    candleHeight: 20,
    width: 10,
    padding: 1
  };

  it("should render a wick line", () => {
    const wrapper = shallow(<Candle {...baseProps}/>);
    const wicks = wrapper.find(Line);
    const values = [
      {
        x1: 5,
        x2: 5,
        y1: 50,
        y2: 10
      }, {
        x1: 5,
        x2: 5,
        y1: 30,
        y2: 5
      }];

    wicks.forEach((wick, i) => {
      expect(wick.prop("x1")).to.eql(values[i].x1);
      expect(wick.prop("x2")).to.eql(values[i].x2);
      expect(wick.prop("y1")).to.eql(values[i].y1);
      expect(wick.prop("y2")).to.eql(values[i].y2);
    });
  });

  it("should render a candle rectangle", () => {
    const wrapper = shallow(<Candle {...baseProps}/>);
    const rect = wrapper.find(Rect);

    // width = style.width || 0.5 * (width - 2 * padding) / data.length;

    expect(rect.prop("width")).to.eql(2);
    expect(rect.prop("height")).to.eql(20);
    // x = x - width / 2
    expect(rect.prop("x")).to.eql(4);
    expect(rect.prop("y")).to.eql(10);
  });

  it("should allow style to override width", () => {
    const props = merge({}, baseProps, {
      style: {
        width: 5
      }
    });

    const wrapper = shallow(<Candle {...props}/>);
    const rect = wrapper.find(Rect);

    expect(rect.prop("width")).to.eql(5);
    expect(rect.prop("height")).to.eql(20);
    // x = x - width / 2
    expect(rect.prop("x")).to.eql(2.5);
    expect(rect.prop("y")).to.eql(10);
  });
});
