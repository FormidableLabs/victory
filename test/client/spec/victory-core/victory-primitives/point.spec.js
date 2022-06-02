import React from "react";
import { shallow } from "enzyme";
import { assign } from "lodash";
import { Point, Path, PointPathHelpers as pathHelpers } from "victory-core";

describe("victory-primitives/point", () => {
  const baseProps = {
    x: 5,
    y: 10,
    size: 1
  };

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
  ].forEach((symbol) => {
    it(`should render the appropriate symbol "${symbol}"`, () => {
      const props = assign({}, baseProps, { symbol });
      const wrapper = shallow(<Point {...props} />);
      const directions = wrapper.find(Path).prop("d");

      const expected = pathHelpers[symbol](
        baseProps.x,
        baseProps.y,
        baseProps.size
      );

      expect(directions).to.eql(expected);
    });
  });
});
