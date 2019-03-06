/*eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import * as d3Shape from "d3-shape";
import { Helpers, CommonProps, Path } from "victory-core";

const defined = (d) => {
  const y = d._y1 !== undefined ? d._y1 : d._y;
  return y !== null && y !== undefined && d._y0 !== null;
};

const getXAccessor = (scale) => {
  return (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
};

const getYAccessor = (scale) => {
  return (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
};

const getY0Accessor = (scale) => {
  return (d) => scale.y(d._y0);
};

const getAngleAccessor = (scale) => {
  return (d) => {
    const x = scale.x(d._x1 !== undefined ? d._x1 : d._x);
    return -1 * x + Math.PI / 2;
  };
};

export default class Area extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    groupComponent: PropTypes.element,
    interpolation: PropTypes.string,
    pathComponent: PropTypes.element
  };

  static defaultProps = {
    groupComponent: <g />,
    pathComponent: <Path />
  };

  getLineFunction(props) {
    const { polar, scale, horizontal } = props;
    const interpolation = this.toNewName(props.interpolation);
    return polar
      ? d3Shape
          .lineRadial()
          .defined(defined)
          .curve(d3Shape[`${interpolation}Closed`])
          .angle(getAngleAccessor(scale))
          .radius(getYAccessor(scale))
      : d3Shape
          .line()
          .defined(defined)
          .curve(d3Shape[interpolation])
          .x(horizontal ? getYAccessor(scale) : getXAccessor(scale))
          .y(horizontal ? getXAccessor(scale) : getYAccessor(scale));
  }

  getCartesianArea(props, interpolation) {
    const { horizontal, scale } = props;
    return horizontal
      ? d3Shape
          .area()
          .defined(defined)
          .curve(d3Shape[interpolation])
          .x0(getY0Accessor(scale))
          .x1(getYAccessor(scale))
          .y(getXAccessor(scale))
      : d3Shape
          .area()
          .defined(defined)
          .curve(d3Shape[interpolation])
          .x(getXAccessor(scale))
          .y1(getYAccessor(scale))
          .y0(getY0Accessor(scale));
  }

  getAreaFunction(props) {
    const { polar, scale } = props;
    const interpolation = this.toNewName(props.interpolation);
    return polar
      ? d3Shape
          .radialArea()
          .defined(defined)
          .curve(d3Shape[`${interpolation}Closed`])
          .angle(getAngleAccessor(scale))
          .outerRadius(getYAccessor(scale))
          .innerRadius(getY0Accessor(scale))
      : this.getCartesianArea(props, interpolation);
  }

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  render() {
    const {
      role,
      shapeRendering,
      className,
      polar,
      origin,
      data,
      active,
      pathComponent,
      events,
      groupComponent,
      clipPath,
      id
    } = this.props;
    const style = Helpers.evaluateStyle(assign({ fill: "black" }, this.props.style), data, active);
    const defaultTransform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const transform = this.props.transform || defaultTransform;
    const renderLine = style.stroke && style.stroke !== "none" && style.stroke !== "transparent";
    const areaFunction = this.getAreaFunction(this.props);
    const lineFunction = renderLine && this.getLineFunction(this.props);

    const areaStroke = style.stroke ? "none" : style.fill;

    const sharedProps = { className, role, shapeRendering, transform, events, clipPath };
    const area = React.cloneElement(
      pathComponent,
      assign(
        {
          key: `${id}-area`,
          style: assign({}, style, { stroke: areaStroke }),
          d: areaFunction(data)
        },
        sharedProps
      )
    );

    const line = renderLine
      ? React.cloneElement(
          pathComponent,
          assign(
            {
              key: `${id}-area-stroke`,
              style: assign({}, style, { fill: "none" }),
              d: lineFunction(data)
            },
            sharedProps
          )
        )
      : null;

    return renderLine ? React.cloneElement(groupComponent, {}, [area, line]) : area;
  }
}
