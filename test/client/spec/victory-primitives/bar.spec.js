import React from "react";
import { shallow } from "enzyme";
import Bar from "src/victory-primitives/bar";
import SvgTestHelper from "../svg-test-helper";

describe("victory-primitives/bar", () => {
  it("should render a vertical bar", () => {
    const props = {
      data: [
        {_x: 2, x: 2, _y: 4, y: 4, eventKey: 0},
        {_x: 3, x: 3, _y: 5, y: 5, eventKey: 1},
      ],
      datum: {_x: 2, x: 2, _y: 4, y: 4, eventKey: 0},
      x: 2,
      y: 4,
      y0: 0,
      width: 5,
      padding: 2
    };

    const wrapper = shallow(<Bar {...props}/>);
    SvgTestHelper.expectIsVerticalBar(wrapper, 4);
  });

  it("should render a horizontal bar", () => {
    const props = {
      data: [
        {_x: 2, x: 2, _y: 4, y: 4, eventKey: 0},
        {_x: 3, x: 3, _y: 5, y: 5, eventKey: 1},
      ],
      datum: {_x: 2, x: 2, _y: 4, y: 4, eventKey: 0},
      x: 2,
      y: 4,
      y0: 0,
      width: 5,
      padding: 2,
      horizontal: true
    };

    const wrapper = shallow(<Bar {...props}/>);
    SvgTestHelper.expectIsHorizontalBar(wrapper, 4);
  });
});
