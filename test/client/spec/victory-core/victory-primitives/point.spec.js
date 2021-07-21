/* global sinon */

import React from "react";
import { shallow } from "enzyme";
import { assign } from "lodash";
import Point from "packages/victory-core/src/victory-primitives/point";
import Path from "packages/victory-core/src/victory-primitives/path";
import pathHelpers from "packages/victory-core/src/victory-primitives/path-helpers";

describe("victory-primitives/point", () => {
  let stub;
  let baseProps;

  beforeEach(() => {
    baseProps = {
      x: 5,
      y: 10,
      size: 1
    };
  });

  afterEach(() => {
    stub.restore();
  });

  it("should render the appropriate symbol", () => {
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
      stub = sinon.stub(pathHelpers, symbol).returns(`${symbol} symbol`);
      const props = assign({}, baseProps, { symbol });
      const wrapper = shallow(<Point {...props} />);
      const directions = wrapper.find(Path).prop("d");

      expect(stub.callCount).to.eql(1);
      expect(stub.getCall(0).args).to.eql([5, 10, 1]);
      expect(directions).to.eql(`${symbol} symbol`);
    });
  });
});
