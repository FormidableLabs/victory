import React from "react";
import { render } from "@testing-library/react";

import { SVGWrapper } from "../../../test/helpers";
import { Flyout } from "./flyout";

describe("victory-primitives/flyout", () => {
  const baseProps = {
    x: 100,
    y: 100,
    dx: 0,
    dy: 0,
    width: 50,
    height: 50,
    cornerRadius: 5,
    pointerLength: 10,
    pointerWidth: 10,
  };
  describe("rendering", () => {
    it("renders a flyout path", () => {
      const { container } = render(<Flyout {...baseProps} />, {
        wrapper: SVGWrapper,
      });
      const path = container.querySelector("path");

      // Make sure the path is rendered:
      expect(path).toMatchInlineSnapshot(`
        <path
          d="M -5, -25
            L 5, -25
            L 5, -25
            L 20, -25
            A 5 5 0 0 1 25, -20
            L 25, 20
            A 5 5 0 0 1 20, 25
            L -20, 25
            A 5 5 0 0 1 -25, 20
            L -25, -20
            A 5 5 0 0 1 -20, -25
            z"
          role="presentation"
          shape-rendering="auto"
        />
      `);
    });
  });
});
