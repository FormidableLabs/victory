import React from "react";
import { shallow } from "enzyme";
import { ClipPath } from "src/victory-primitives";
import { forEach, merge } from "lodash";

describe.only("victory-primitives/clip-path", () => {
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
    padding: 10,
    translateX: 3,
    translateY: 8
  };

  it("should render a rectangle", () => {
    const wrapper = shallow(<ClipPath {...baseProps}/>);
    const rect = wrapper.render().find("defs").find("clipPath").find("rect");

    const expectedAttrs = {
      x: 11, // left padding - left clipPadding + translateX
      y: 16, // right padding - right clipPadding + translateY
      width: 4, // clipWidth - right padding - left padding
      height: 14 // clipHeight - top padding - bottom padding
    };

    forEach(expectedAttrs, (expectedValue, attrName) => {
      expect(parseFloat(rect.attr(attrName), 10)).to.eql(expectedValue);
    });
  });

  it("should render a clipPath with the passed id", () => {
    const wrapper = shallow(<ClipPath {...baseProps}/>);
    const clipPath = wrapper.render().find("defs").find("clipPath");

    expect(parseFloat(clipPath.attr("id"), 10)).to.eql(4);
  });

  it("should keep minimum height and width of 0", () => {
    const props = merge({}, baseProps, {
      // less than padding
      clipHeight: 10,
      clipWidth: 10
    });
    const wrapper = shallow(<ClipPath {...props}/>);
    const rect = wrapper.render().find("defs").find("clipPath").find("rect");

    const expectedAttrs = {
      x: 11, // left padding - left clipPadding + translateX
      y: 16, // right padding - right clipPadding + translateY
      width: 0, // clipWidth - right padding - left padding
      height: 0 // clipHeight - top padding - bottom padding
    };

    forEach(expectedAttrs, (expectedValue, attrName) => {
      expect(parseFloat(rect.attr(attrName), 10)).to.eql(expectedValue);
    });
  });
});
