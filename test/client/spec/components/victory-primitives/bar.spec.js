import React from "react";
import { mount } from "enzyme";
import Bar from "packages/victory-bar/src/bar";
import SvgTestHelper from "../../svg-test-helper";
import * as d3Scale from "d3-scale";
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
    padding: 2,
    scale: {
      x: d3Scale.scaleLinear(),
      y: d3Scale.scaleLinear()
    }
  };

  it("should render a vertical bar", () => {
    const wrapper = mount(<Bar {...baseProps}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);
    expect(Math.round(barShape.height)).to.eql(10);
  });

  it("should render a horizontal bar", () => {
    const props = merge({}, baseProps, { horizontal: true });

    const wrapper = mount(<Bar {...props}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);

    expect(Math.round(barShape.width)).to.eql(10);
  });

  it("should render a default bar width when one is not provided", () => {
    const props = merge({}, baseProps, {
      width: 10,
      padding: 1,
      data: Array(4)
    });

    const wrapper = mount(<Bar {...props}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);

    expect(Math.floor(barShape.width)).to.eql(2);
  });

  it("should allow override of width by passing a style", () => {
    const props = Object.assign({}, baseProps, { style: { width: 3 } });

    const wrapper = mount(<Bar {...props}/>);
    const barShape = SvgTestHelper.getBarShape(wrapper);

    expect(Math.floor(barShape.width)).to.eql(3);
  });
});
