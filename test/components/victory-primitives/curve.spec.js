import React from "react";
import { shallow } from "enzyme";
import Curve from "packages/victory-core/src/victory-primitives/curve";
import Path from "packages/victory-core/src/victory-primitives/path";

describe("victory-primitives/curve", () => {
  const baseProps = {
    data: [
      { _x1: 1, x1: 1, _y1: 4, y1: 4, eventKey: 0 },
      { _x1: 2, x1: 2, _y1: 5, y1: 5, eventKey: 1 },
      { _x1: 3, x1: 3, _y1: 7, y1: 7, eventKey: 2 },
      { _x1: 4, x1: 4, _y1: 10, y1: 10, eventKey: 3 },
      { _x1: 5, x1: 5, _y1: 15, y1: 15, eventKey: 4 }
    ],
    scale: {
      x: (x) => x,
      y: (y) => y
    },
    interpolation: "basis"
  };

  it("should render a single curve for consecutive data", () => {
    const wrapper = shallow(<Curve {...baseProps}/>);

    // single curves should not be grouped
    expect(wrapper.find("g").find(Path).length).to.eql(0);
    expect(wrapper.find(Path).length).to.eql(1);
  });
});
