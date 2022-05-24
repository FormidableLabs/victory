/**
 * Client tests
 */
import React from "react";
import { VictoryTooltip } from "victory-tooltip";
import { fireEvent, screen } from "@testing-library/react";
import { renderInSvg } from "../rendering-utils";

describe("components/victory-tooltip", () => {
  const baseProps = {
    x: 0,
    y: 0,
    datum: { some: "object" },
    index: 3,
    active: true,
    text: "such text, wow"
  };

  it("renders the expected text", () => {
    renderInSvg(<VictoryTooltip {...baseProps} />);
    const output = screen.getByText(baseProps.text);
    expect(output).toBeInTheDocument();
    expect(output).toBeVisible();
  });

  it("renders nothing when not active", () => {
    const { container } = renderInSvg(
      <VictoryTooltip {...baseProps} active={false} />
    );
    const output = container.querySelector("text");
    expect(output).toBeInTheDocument();
    expect(output).not.toBeVisible();
  });

  it("renders a flyout and a label", () => {
    const { container } = renderInSvg(<VictoryTooltip {...baseProps} />);
    const label = container.querySelector("text");
    const flyout = container.querySelector("path");
    expect(label).toBeInTheDocument();
    expect(flyout).toBeInTheDocument();
  });

  describe("event handling", () => {
    it("attaches an to the flyout object", () => {
      const clickHandler = jest.fn();
      const { container } = renderInSvg(
        <VictoryTooltip {...baseProps} events={{ onClick: clickHandler }} />
      );
      fireEvent.click(container.querySelector("path"));
      expect(clickHandler).toBeCalled();
    });
  });
});
