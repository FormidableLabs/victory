/* global sinon */

import React from "react";
import { shallow } from "enzyme";
import Point from "src/victory-primitives/point";
import pathHelpers from "src/victory-primitives/path-helpers";

describe("victory-primitives/point", () => {
  let sandbox;
  let baseProps;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
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
      "star"
    ].forEach((symbol) => {
      const stub = sandbox.stub(pathHelpers, symbol).returns(`${symbol} symbol`);
      const props = Object.assign({}, baseProps, { symbol });
      const wrapper = shallow(<Point {...props}/>);
      const directions = wrapper.render().find("path").attr("d");

      expect(stub.callCount).to.eql(1);
      expect(stub.getCall(0).args).to.eql([5, 10, 1]);
      expect(directions).to.eql(`${symbol} symbol`);
    });
  });
});
