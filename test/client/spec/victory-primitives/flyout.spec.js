/*eslint-disable max-nested-callbacks,no-unused-expressions,max-len */
import React from "react";
import { shallow } from "enzyme";
import { Flyout } from "src/victory-primitives";
import SvgTestHelper from "../svg-test-helper";

describe("victory-primitives/slice", () => {
  const baseProps = {
    x: 100, y: 100, dx: 0, dy: 0, width: 50, height: 50, cornerRadius: 5,
    pointerLength: 10, pointerWidth: 10
  };
  describe("rendering", () => {
    it("renders a flyout path", () => {
      const wrapper = shallow(<Flyout {...baseProps}/>);
      SvgTestHelper.expectIsFlyout(wrapper);
    });
  });
});
