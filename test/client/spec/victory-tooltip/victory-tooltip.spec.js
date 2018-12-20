/**
 * Client tests
 */
/* global sinon */
import React from "react";
import { mount } from "enzyme";
import { VictoryTooltip, Flyout } from "packages/victory-tooltip/src/index";
import { VictoryLabel } from "packages/victory-core";

describe("components/victory-tooltip", () => {
  const baseProps = {
    x: 0,
    y: 0,
    datum: { some: "object" },
    index: 3,
    active: true,
    text: "such text, wow"
  };

  it("renders nothing when not active", () => {
    const wrapper = mount(<VictoryTooltip {...baseProps} active={false} />);
    const output = wrapper.find("text");
    expect(output.length).to.equal(0);
  });

  it("has expected text", () => {
    const wrapper = mount(<VictoryTooltip {...baseProps} />);
    const output = wrapper.find("text");
    expect(output.html()).to.contain(baseProps.text);
  });

  it("renders a flyout and a label", () => {
    const wrapper = mount(<VictoryTooltip {...baseProps} />);
    const label = wrapper.find(VictoryLabel);
    const flyout = wrapper.find(Flyout);
    expect(label.length).to.equal(1);
    expect(flyout.length).to.equal(1);
  });

  it("passes datum and index to flyout component", () => {
    const wrapper = mount(<VictoryTooltip {...baseProps} />);
    const flyout = wrapper.find(Flyout);
    expect(flyout.prop("datum")).to.eql({ some: "object" });
    expect(flyout.prop("index")).to.eql(3);
  });

  describe("event handling", () => {
    it("attaches an to the flyout object", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(<VictoryTooltip {...baseProps} events={{ onClick: clickHandler }} />);
      wrapper.find("path").simulate("click");
      expect(clickHandler.called).to.equal(true);
    });
  });
});
