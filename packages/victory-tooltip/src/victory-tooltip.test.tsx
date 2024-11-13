import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";
import { VictoryContainer, VictoryLabel } from "victory-core";

import { Flyout } from "./flyout";
import { VictoryTooltip } from "./victory-tooltip";

describe("components/victory-tooltip", () => {
  const flyoutId = "flyout-1";
  const labelId = "label-1";

  const baseProps = {
    x: 0,
    y: 0,
    datum: { some: "object" },
    index: 3,
    active: true,
    text: "such text, wow",
    flyoutComponent: <Flyout data-testid={flyoutId} />,
    labelComponent: <VictoryLabel data-testid={labelId} />,
  };

  it("renders nothing when not active", () => {
    render(<VictoryTooltip {...baseProps} active={false} />, {
      wrapper: VictoryContainer as React.JSXElementConstructor<{
        children: React.ReactNode;
      }>,
    });
    const output = screen.queryByTestId(labelId);
    expect(output).not.toBeInTheDocument();
  });

  it("renders the expected text", () => {
    render(<VictoryTooltip {...baseProps} />, {
      wrapper: VictoryContainer as React.JSXElementConstructor<{
        children: React.ReactNode;
      }>,
    });
    const output = screen.getByTestId(labelId);
    expect(output).toBeInTheDocument();
    expect(output).toBeVisible();
    expect(output).toHaveTextContent(baseProps.text);
  });

  it("renders a flyout and a label", () => {
    render(<VictoryTooltip {...baseProps} />, {
      wrapper: VictoryContainer as React.JSXElementConstructor<{
        children: React.ReactNode;
      }>,
    });
    const label = screen.getByTestId(labelId);
    const flyout = screen.getByTestId(flyoutId);
    expect(label).toBeInTheDocument();
    expect(flyout).toBeInTheDocument();
  });

  describe("event handling", () => {
    it("attaches an to the flyout object", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryTooltip {...baseProps} events={{ onClick: clickHandler }} />,
        {
          wrapper: VictoryContainer as React.JSXElementConstructor<{
            children: React.ReactNode;
          }>,
        },
      );
      fireEvent.click(screen.getByTestId(flyoutId));
      expect(clickHandler).toBeCalled();
    });
  });
});
