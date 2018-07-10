import React from "react";
import { mount } from "enzyme";
import Area from "packages/victory-area/src/area";
import { Path } from "packages/victory-core/src/index";
import { merge } from "lodash";

describe("victory-primitives/area", () => {
  const baseProps = {
    data: [
      { _x1: 1, x1: 1, _y1: 4, y1: 4, _y0: 0, eventKey: 0 },
      { _x1: 2, x1: 2, _y1: 5, y1: 5, _y0: 0, eventKey: 1 },
      { _x1: 3, x1: 3, _y1: 7, y1: 7, _y0: 0, eventKey: 2 },
      { _x1: 4, x1: 4, _y1: 10, y1: 10, _y0: 0, eventKey: 3 },
      { _x1: 5, x1: 5, _y1: 15, y1: 15, _y0: 0, eventKey: 4 }
    ],
    scale: {
      x: (x) => x,
      y: (y) => y
    },
    interpolation: "basis",
    style: {
      stroke: "tomato"
    }
  };

  it("should render a single area and no line when no line style is given", () => {
    const props = merge({}, baseProps, {
      style: {
        stroke: "none"
      }
    });

    const wrapper = mount(<Area {...props}/>);
    expect(wrapper.find(Path).length).to.eql(1);
  });

  it("should render an area and line when a line style is given", () => {
    const wrapper = mount(<Area {...baseProps}/>);
    // multiple paths should be grouped
    expect(wrapper.find("g").find(Path).length).to.eql(2);
  });
});
