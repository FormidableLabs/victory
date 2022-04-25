/* global sinon */

import React from "react";
import { shallow } from "enzyme";
import { assign } from "lodash";
import Point from "victory-core/src/victory-primitives/point";
import Path from "victory-core/src/victory-primitives/path";
import pathHelpers from "victory-core/src/victory-util/point-path-helpers";

describe("victory-primitives/point", () => {
  let sandbox;
  let baseProps;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    baseProps = {
      x: 5,
      y: 10,
      size: 1
    };
  });

  afterEach(() => {
    sandbox.restore();
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
      const stub = sandbox
        .stub(pathHelpers, symbol)
        .returns(`${symbol} symbol`);
      const props = assign({}, baseProps, { symbol });
      const wrapper = shallow(<Point {...props} />);
      const directions = wrapper.find(Path).prop("d");

      expect(stub.callCount).to.eql(1);
      expect(stub.getCall(0).args).to.eql([5, 10, 1]);
      expect(directions).to.eql(`${symbol} symbol`);
    });
  });
});
