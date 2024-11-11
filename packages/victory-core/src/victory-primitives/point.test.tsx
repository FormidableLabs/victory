import { render } from "@testing-library/react";
import React from "react";

import { SVGWrapper } from "../../../../test/helpers";
import { PointPathHelpers } from "../victory-util";
import { Point } from "./point";

describe("victory-primitives/point", () => {
  const baseProps = {
    x: 5,
    y: 10,
    size: 1,
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
      "cross",
    ] as const
  ).forEach((symbol) => {
    it(`should render the appropriate symbol for "${symbol}"`, () => {
      const stub = jest
        .spyOn(PointPathHelpers, symbol)

        .mockImplementation(() => `${symbol} symbol`);
      const props = Object.assign({}, baseProps, { symbol });
      const { container } = render(<Point {...props} />, {
        wrapper: SVGWrapper,
      });
      const directions = container.querySelector("path")!.getAttribute("d");

      expect(stub).toHaveBeenCalledTimes(1);
      expect(stub).toHaveBeenCalledWith(5, 10, 1);
      expect(directions).toEqual(`${symbol} symbol`);
    });
  });
});
