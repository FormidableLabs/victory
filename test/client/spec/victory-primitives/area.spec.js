import React from "react";
import { shallow } from "enzyme";
import Area from "src/victory-primitives/area";
import { merge } from "lodash";

describe.only("victory-primitives/area", () => {
  const baseProps = {
    data: [
      {_x1: 1, x1: 1, _y1: 4, y1: 4, _y0: 0, eventKey: 0},
      {_x1: 2, x1: 2, _y1: 5, y1: 5, _y0: 0, eventKey: 1},
      {_x1: 3, x1: 3, _y1: 7, y1: 7, _y0: 0, eventKey: 2},
      {_x1: 4, x1: 4, _y1: 10, y1: 10, _y0: 0, eventKey: 3},
      {_x1: 5, x1: 5, _y1: 15, y1: 15, _y0: 0, eventKey: 4}
    ],
    scale: {
      x: (x) => x,
      y: (y) => y
    },
    interpolation: "basis",
    groupComponent: <g/>,
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

    const wrapper = shallow(<Area {...props}/>);

    // single area/curves should not be grouped
    expect(wrapper.render().find("g").find("path").length).to.eql(0);
    expect(wrapper.render().find("path").length).to.eql(1);
  });

  it("should render an area and line when a line style is given", () => {
    const wrapper = shallow(<Area {...baseProps}/>);

    // multiple paths should be grouped
    expect(wrapper.render().find("g").find("path").length).to.eql(2);
  });

  it("should render multiple segments when data has gaps", () => {
    const props = merge({}, baseProps, {
      data: [
        {_x1: 1, x1: 1, _y1: 4, y1: 4, _y0: 0, eventKey: 0},
        {_x1: 2, x1: 2, _y1: 5, y1: 5, _y0: 0, eventKey: 1},
        {_x1: 3, x1: 3, _y1: null, y1: null, _y0: 0, eventKey: 2},
        {_x1: 4, x1: 4, _y1: 10, y1: 10, _y0: 0, eventKey: 3},
        {_x1: 5, x1: 5, _y1: 15, y1: 15, _y0: 0, eventKey: 4}
      ]
    });

    const wrapper = shallow(<Area {...props}/>);

    expect(wrapper.render().find("g").find("path").length).to.eql(4);
  });

  it("should not render isolated data points", () => {
    const props = merge({}, baseProps, {
      data: [
        {_x1: 1, x1: 1, _y1: 4, y1: 4, _y0: 0, eventKey: 0},
        {_x1: 2, x1: 2, _y1: 5, y1: 5, _y0: 0, eventKey: 1},
        {_x1: 3, x1: 3, _y1: null, y1: null, _y0: 0, eventKey: 2},
        {_x1: 4, x1: 4, _y1: 10, y1: 10, _y0: 0, eventKey: 3},
        {_x1: 5, x1: 5, _y1: null, y1: null, _y0: 0, eventKey: 4},
        {_x1: 6, x1: 6, _y1: 20, y1: 20, _y0: 0, eventKey: 5}
      ]
    });

    const wrapper = shallow(<Area {...props}/>);

    expect(wrapper.render().find("g").find("path").length).to.eql(2);
  });
});
