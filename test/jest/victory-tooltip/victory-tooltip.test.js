/**
 * Client tests
 */
import React from "react";
import { mount } from "enzyme";
import { VictoryTooltip, Flyout } from "victory-tooltip";
import { VictoryLabel } from "victory-core";

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
    expect(output.length).toEqual(0);
  });

  it("has expected text", () => {
    const wrapper = mount(<VictoryTooltip {...baseProps} />);
    const output = wrapper.find("text");
    expect(output.html()).toMatch(baseProps.text);
  });

  it("renders a flyout and a label", () => {
    const wrapper = mount(<VictoryTooltip {...baseProps} />);
    const label = wrapper.find(VictoryLabel);
    const flyout = wrapper.find(Flyout);
    expect(label.length).toEqual(1);
    expect(flyout.length).toEqual(1);
  });

  it("passes datum and index to flyout component", () => {
    const wrapper = mount(<VictoryTooltip {...baseProps} />);
    const flyout = wrapper.find(Flyout);
    expect(flyout.prop("datum")).toEqual({ some: "object" });
    expect(flyout.prop("index")).toEqual(3);
  });

  describe("event handling", () => {
    it("attaches an to the flyout object", () => {
      const clickHandler = jest.fn();
      const wrapper = mount(
        <VictoryTooltip {...baseProps} events={{ onClick: clickHandler }} />
      );
      wrapper.find("path").simulate("click");
      expect(clickHandler).toBeCalled();
    });
  });
});
