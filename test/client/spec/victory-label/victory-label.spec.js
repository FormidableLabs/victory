/**
 * Client tests
 */
/* global sinon */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryLabel from "src/victory-label/victory-label";

describe("components/victory-label", () => {
  it("has expected content with shallow render", () => {
    const wrapper = shallow(
      <VictoryLabel>time (ms)</VictoryLabel>
    );
    const output = wrapper.find("text");
    expect(output.html()).to.contain("time (ms)");
  });

  it("falls back to label prop without children", () => {
    const wrapper = shallow(
      <VictoryLabel text={"such text, wow"}/>
    );
    const output = wrapper.find("text");
    expect(output.html()).to.contain("such text, wow");
  });

  it("has a transform property that rotates the text to match the labelAngle prop", () => {
    const wrapper = shallow(
      <VictoryLabel angle={46} text={"such text, wow"}/>
    );
    const output = wrapper.find("text");
    expect(output.prop("transform")).to.contain("rotate(46");
  });

  describe("event handling", () => {
    it("attaches an to the parent object", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryLabel events={{onClick: clickHandler}}/>
      );
      wrapper.find("text").simulate("click");
      expect(clickHandler.called).to.equal(true);
    });
  });
});
