/**
 * Client tests
 */
/* global sinon */
import React from "react";
import { mount } from "enzyme";
import VictoryLabel from "src/victory-label/victory-label";
import VictoryTooltip from "src/victory-tooltip/victory-tooltip";
import Flyout from "src/victory-primitives/flyout";

describe("components/victory-label", () => {
  const baseProps = { x: 0, y: 0, active: true, text: "such text, wow" };
  it("renders nothing when not active", () => {
    const wrapper = mount(
      <VictoryTooltip {...baseProps} active={false}/>
    );
    const output = wrapper.find("text");
    expect(output.length).to.equal(0);
  });

  it("has expected text", () => {
    const wrapper = mount(
      <VictoryTooltip {...baseProps}/>
    );
    const output = wrapper.find("text");
    expect(output.html()).to.contain(baseProps.text);
  });

  it("renders a flyout and a label", () => {
    const wrapper = mount(
      <VictoryTooltip {...baseProps}/>
    );
    const label = wrapper.find(VictoryLabel);
    const flyout = wrapper.find(Flyout);
    expect(label.length).to.equal(1);
    expect(flyout.length).to.equal(1);
  });

  describe("event handling", () => {
    it("attaches an to the flyout object", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryTooltip {...baseProps} events={{ onClick: clickHandler }}/>
      );
      wrapper.find("path").simulate("click");
      expect(clickHandler.called).to.equal(true);
    });
  });
});
