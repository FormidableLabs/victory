import React from "react";
import { ClipPath } from "victory-core";
import { renderInSvg } from "../../rendering-utils";

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
    const { container } = renderInSvg(
      <ClipPath {...baseProps}>
        <rect data-testid="rect" />
      </ClipPath>
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
    const { container } = renderInSvg(<ClipPath {...baseProps} />);

    expect(container.querySelector("clipPath")).toMatchInlineSnapshot(`
      <clippath
        id="4"
      />
    `);
  });
});
