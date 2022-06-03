import { render } from "@testing-library/react";
import React from "react";
import { ClipPath } from "victory-core";

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
    const { container } = render(
      <ClipPath {...baseProps}>
        <rect data-testid="rect" />
      </ClipPath>,
      { wrapper: "svg" }
    );

    expect(container.querySelector("clipPath")).toMatchInlineSnapshot(`
      <clippath
        id="4"
      >
        <rect
          data-testid="rect"
        />
      </clippath>
    `);
  });

  it("should render a clipPath with the passed id", () => {
    const { container } = render(<ClipPath {...baseProps} />, {
      wrapper: "svg"
    });

    expect(container.querySelector("clipPath")).toMatchInlineSnapshot(`
      <clippath
        id="4"
      />
    `);
  });
});
