import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Path } from "victory-core";
import { defaults, isFunction } from "lodash";
import * as d3Shape from "d3-shape";

export default class Slice extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    cornerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    datum: PropTypes.object,
    innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    padAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    pathComponent: PropTypes.element,
    pathFunction: PropTypes.func,
    radius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    slice: PropTypes.object,
    sliceEndAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sliceStartAngle: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
  };

  static defaultProps = {
    pathComponent: <Path />
  };

  getPath(props) {
    const { slice } = props;
    if (isFunction(props.pathFunction)) {
      return props.pathFunction(slice);
    }
    const cornerRadius = Helpers.evaluateProp(props.cornerRadius, props);
    const innerRadius = Helpers.evaluateProp(props.innerRadius, props);
    const radius = Helpers.evaluateProp(props.radius, props);
    const padAngle = Helpers.degreesToRadians(Helpers.evaluateProp(props.padAngle, props));
    const startAngle = Helpers.degreesToRadians(
      Helpers.evaluateProp(props.sliceStartAngle, props)
    );
    const endAngle = Helpers.degreesToRadians(
      Helpers.evaluateProp(props.sliceEndAngle, props)
    );
    const pathFunction = d3Shape
      .arc()
      .cornerRadius(cornerRadius)
      .outerRadius(radius)
      .innerRadius(innerRadius);
    return pathFunction(defaults({ startAngle, endAngle, padAngle }, slice));
  }

  render() {
    const {
      role,
      shapeRendering,
      className,
      origin,
      events,
      pathComponent,
      style,
      clipPath
    } = this.props;
    const defaultTransform = origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const transform = this.props.transform || defaultTransform;
    return React.cloneElement(pathComponent, {
      className,
      role,
      shapeRendering,
      events,
      transform,
      clipPath,
      style: Helpers.evaluateStyle(style, this.props),
      d: this.getPath(this.props)
    });
  }
}
