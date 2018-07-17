/*eslint-disable max-nested-callbacks,no-unused-expressions,max-len */
import React from "react";
import { mount } from "enzyme";
import Flyout from "packages/victory-tooltip/src/flyout";
import SvgTestHelper from "../svg-test-helper";

describe("victory-primitives/flyout", () => {
  const baseProps = {
    x: 100, y: 100, dx: 0, dy: 0, width: 50, height: 50, cornerRadius: 5,
    pointerLength: 10, pointerWidth: 10
  };
  describe("rendering", () => {
    it("renders a flyout path", () => {
      const wrapper = mount(<Flyout {...baseProps}/>);
      SvgTestHelper.expectIsFlyout(wrapper);
    });
  });
});
