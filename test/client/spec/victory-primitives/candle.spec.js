import React from "react";
import { shallow } from "enzyme";
import Candle from "src/victory-primitives/candle";
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
    candleHeight: 20,
    width: 10,
    padding: 1
  };

  it("should render a wick line", () => {
    const wrapper = shallow(<Candle {...baseProps}/>);

    expect(wrapper.find("line")).to.have.length(2);
  });

  it("should render a candle rectangle", () => {
    const wrapper = shallow(<Candle {...baseProps}/>);
    const rect = wrapper.find("rect");

    // width = style.width || 0.5 * (width - 2 * padding) / data.length;

    expect(rect.prop("width")).to.eql(2);
    expect(rect.prop("height")).to.eql(20);
    // x = x - width / 2
    expect(rect.prop("x")).to.eql(4);
  });

  it("should allow style to override width", () => {
    const props = merge({}, baseProps, {
      style: {
        width: 5
      }
    });

    const wrapper = shallow(<Candle {...props}/>);
    const rect = wrapper.find("rect");

    expect(rect.prop("width")).to.eql(5);
    expect(rect.prop("height")).to.eql(20);
    // x = x - width / 2
    expect(rect.prop("x")).to.eql(2.5);
  });
});
