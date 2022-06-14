import { render } from "@testing-library/react";
import { assign } from "lodash";
import React from "react";
import { PointPathHelpers as pathHelpers, Point } from "victory-core";
import { SVGWrapper } from "../../../../test/helpers";

describe("victory-primitives/point", () => {
  const baseProps = {
    x: 5,
    y: 10,
    size: 1
  };

  (
    [
      "circle",
      "square",
      "diamond",
      "triangleDown",
      "triangleUp",
      "plus",
      "minus",
      "star",
      "cross"
    ] as const
  ).forEach((symbol) => {
    it(`should render the appropriate symbol for "${symbol}"`, () => {
      const stub = jest
        .spyOn(pathHelpers, symbol)
        // eslint-disable-next-line max-nested-callbacks
        .mockImplementation(() => `${symbol} symbol`);
      const props = assign({}, baseProps, { symbol });
      const { container } = render(<Point {...props} />, {
        wrapper: SVGWrapper
      });
      const directions = container.querySelector("path")!.getAttribute("d");

      expect(stub).toHaveBeenCalledTimes(1);
      expect(stub).toHaveBeenCalledWith(5, 10, 1);
      expect(directions).toEqual(`${symbol} symbol`);
    });
  });
});
