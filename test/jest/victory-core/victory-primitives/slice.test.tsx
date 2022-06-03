import { render } from "@testing-library/react";
import React from "react";
import { Slice } from "victory-pie";

describe("victory-primitives/slice", () => {
  describe("rendering", () => {
    it("renders a path with attribute `d` equal to the result of `props.pathFunction` called with `props.slice`", () => {
      const EXPECTED_D_ATTR = "M1,1";
      const slice = { x: 1, y: 1 };
      const pathFunction = (sli) => {
        // The path function is called with `props.slice`
        expect(sli).toEqual(slice);

        return EXPECTED_D_ATTR;
      };

      const { container } = render(
        // @ts-expect-error "slice has no properties in common with property slice"
        <Slice pathFunction={pathFunction} slice={slice} />,
        { wrapper: "svg" }
      );

      expect(container.querySelector("path")).toMatchInlineSnapshot(`
        <path
          d="M1,1"
          role="presentation"
          shape-rendering="auto"
        />
      `);
    });
  });
});
