import React from "react";
import { shallow } from "enzyme";
import Bar from "src/victory-primitives/bar";
import SvgTestHelper from "../svg-test-helper";
import { merge } from "lodash";

describe("victory-primitives/bar", () => {
  const baseProps = {
    data: [
      { _x: 2, x: 2, _y: 4, y: 4, eventKey: 0 },
      { _x: 3, x: 3, _y: 5, y: 5, eventKey: 1 }
    ],
    datum: { _x: 2, x: 2, _y: 4, y: 4, eventKey: 0 },
    x: 2,
    y: 10,
    y0: 0,
    width: 5,
    padding: 2
  };

  it("should render a vertical bar", () => {
    const wrapper = shallow(<Bar {...baseProps}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);

    expect(barShape.height).to.eql(10);
  });

  it("should render a horizontal bar", () => {
    const props = merge({}, baseProps, { horizontal: true });

    const wrapper = shallow(<Bar {...props}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);

    expect(barShape.width).to.eql(10);
  });

  it("should render a default bar width when one is not provided", () => {
    // defaultWidth = (width - (2 * padding)) / data.length

    const props = merge({}, baseProps, {
      width: 10,
      padding: 1,
      data: Array(4)
    });

    const wrapper = shallow(<Bar {...props}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);

    expect(barShape.width).to.eql(2);
  });

  it("should allow override of width by passing a style", () => {
    const props = Object.assign({}, baseProps, { style: { width: 1 } });

    const wrapper = shallow(<Bar {...props}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);

    expect(barShape.width).to.eql(1);
  });
});
