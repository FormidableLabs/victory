import React from "react";
import { shallow } from "enzyme";
import Point from "src/victory-primitives/point";
import pathHelpers from "src/victory-primitives/path-helpers";
import { keys } from "lodash";

describe("victory-primitives/point", () => {
  var sandbox;
  var baseProps;

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

  it.only("should render the appropriate symbol", () => {
    const circleStub = sandbox.stub(pathHelpers, "circle").returns("circle symbol");
    const squareStub = sandbox.stub(pathHelpers, "square").returns("square symbol");
    const circleProps = Object.assign({}, baseProps, {symbol: "circle"});
    const squareProps = Object.assign({}, baseProps, {symbol: "square"});

    const circleWrapper = shallow(<Point {...circleProps}/>);
    const squareWrapper = shallow(<Point {...squareProps}/>);
    const circleDirections = circleWrapper.render().find("path").attr("d");
    const squareDirections = squareWrapper.render().find("path").attr("d");

    expect(circleStub.callCount).to.eql(1);
    expect(circleStub.getCall(0).args).to.eql([5, 10, 1]);
    expect(circleDirections).to.eql("circle symbol");

    expect(squareStub.callCount).to.eql(1);
    expect(squareStub.getCall(0).args).to.eql([5, 10, 1]);
    expect(squareDirections).to.eql("square symbol");

  });
});
