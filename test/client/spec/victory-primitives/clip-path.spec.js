import React from "react";
import { shallow } from "enzyme";
import { ClipPath } from "src/victory-primitives";
import { forEach } from "lodash";

describe("victory-primitives/clip-path", () => {
  const baseProps = {
    clipId: 4,
    clipPadding: {
      top: 2,
      bottom: 2,
      left: 2,
      right: 2
    },
    clipHeight: 30,
    clipWidth: 20,
    translateX: 3,
    translateY: 8
  };

  it("should render a rectangle", () => {
    const wrapper = shallow(<ClipPath {...baseProps}/>);
    const rect = wrapper.render().find("defs").find("clipPath").find("rect");

    const expectedAttrs = {
      x: 1, // translateX - left clipPadding
      y: 6, // translateY - top clipPadding
      width: 24, // clipWidth + left clipPadding + right clipPadding
      height: 34 // clipHeight = top clipPadding + bottom clipPadding
    };

    forEach(expectedAttrs, (expectedValue, attrName) => {
      expect(parseFloat(rect.attr(attrName), 10)).to.eql(expectedValue);
    });
  });

  it("should successfully re-render", () => {
    const wrapper = shallow(<ClipPath {...baseProps}/>);

    wrapper.render();
    wrapper.setProps(baseProps);
  });

  it("should render a clipPath with the passed id", () => {
    const wrapper = shallow(<ClipPath {...baseProps}/>);
    const clipPath = wrapper.render().find("defs").find("clipPath");

    expect(parseFloat(clipPath.attr("id"), 10)).to.eql(4);
  });
});
