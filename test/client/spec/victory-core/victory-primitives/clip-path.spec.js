import React from "react";
import { mount } from "enzyme";
import ClipPath from "packages/victory-core/src/victory-primitives/clip-path";

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

  it("should render a children", () => {
    const wrapper = mount(<ClipPath {...baseProps}><rect/></ClipPath>);
    const rect = wrapper.find("defs").find("clipPath").find("rect");

    expect(rect.length).to.equal(1);
  });

  it("should successfully re-render", () => {
    const wrapper = mount(<ClipPath {...baseProps}/>);

    wrapper.render();
    wrapper.setProps(baseProps);
  });

  it("should render a clipPath with the passed id", () => {
    const wrapper = mount(<ClipPath {...baseProps}/>);
    const clipPath = wrapper.find("defs").find("clipPath");

    expect(parseFloat(clipPath.prop("id"), 10)).to.eql(4);
  });
});
