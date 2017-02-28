
import React from "react";
import { shallow } from "enzyme";
import Line from "src/victory-primitives/line";
import SvgTestHelper from "../svg-test-helper";
import { merge } from "lodash";

describe("victory-primitives/line", () => {
  const baseProps = {
    x1: 0,
    y1: 1,
    x2: 2,
    y2: 4,
  };

  it("should render a line element with the correct coordinates", () => {
    const wrapper = shallow(<Line {...baseProps}/>);
    const line = wrapper.render().find("line");

    ["x1", "y1", "x2", "y2"].forEach((coordinate) => {
      const lineAttr = parseFloat(line.attr(coordinate), 10);
      expect(lineAttr).to.eql(baseProps[coordinate]);
    });
  });
});
