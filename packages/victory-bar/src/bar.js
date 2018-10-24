import React from "react";
import PropTypes from "prop-types";
import { Helpers, Path, CommonProps } from "victory-core";
import { assign, isPlainObject, isFunction, isNil } from "lodash";

import {
  getVerticalBarPath,
  getHorizontalBarPath,
  getVerticalPolarBarPath
} from "./path-helper-methods";

export default class Bar extends React.Component {

  static propTypes = {
    ...CommonProps.primitiveProps,
    alignment: PropTypes.oneOf(["start", "middle", "end"]),
    barRatio: PropTypes.number,
    barWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func
    ]),
    cornerRadius: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
      PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        topLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        topRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottomLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottomRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
      })
    ]),
    datum: PropTypes.object,
    getPath: PropTypes.func,
    horizontal: PropTypes.bool,
    pathComponent: PropTypes.element,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number
  };

  static defaultProps = {
    pathComponent: <Path/>,
    defaultBarWidth: 8
  };

  getBarPath(props, width, cornerRadius) {
    return this.props.horizontal ?
      getHorizontalBarPath(props, width, cornerRadius) :
      getVerticalBarPath(props, width, cornerRadius);
  }

  getPolarBarPath(props, cornerRadius) {
    // TODO Radial bars
    return getVerticalPolarBarPath(props, cornerRadius);
  }

  getBarWidth(props, style) {
    const { active, scale, data, barWidth, defaultBarWidth } = props;
    if (barWidth) {
      return isFunction(barWidth) ? Helpers.evaluateProp(barWidth, active) : barWidth;
    } else if (style.width) {
      return style.width;
    }
    const range = scale.x.range();
    const extent = Math.abs(range[1] - range[0]);
    const bars = data.length + 2;
    const barRatio = props.barRatio || 0.5;
    const defaultWidth = barRatio * (data.length < 2 ? defaultBarWidth : extent / bars);
    return Math.max(1, defaultWidth);
  }

  getCornerRadiusFromObject(props) {
    const { cornerRadius, datum, active } = props;
    const result = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
    if (!isNil(cornerRadius.topLeft)) {
      result.topLeft = Helpers.evaluateProp(cornerRadius.topLeft, datum, active);
    } else if (!isNil(cornerRadius.top)) {
      result.topLeft = Helpers.evaluateProp(cornerRadius.top, datum, active);
    }
    if (!isNil(cornerRadius.topRight)) {
      result.topRight = Helpers.evaluateProp(cornerRadius.topRight, datum, active);
    } else if (!isNil(cornerRadius.top)) {
      result.topRight = Helpers.evaluateProp(cornerRadius.top, datum, active);
    }
    if (!isNil(cornerRadius.bottomLeft)) {
      result.bottomLeft = Helpers.evaluateProp(cornerRadius.bottomLeft, datum, active);
    } else if (!isNil(cornerRadius.bottom)) {
      result.bottomLeft = Helpers.evaluateProp(cornerRadius.bottom, datum, active);
    }
    if (!isNil(cornerRadius.bottomRight)) {
      result.bottomRight = Helpers.evaluateProp(cornerRadius.bottomRight, datum, active);
    } else if (!isNil(cornerRadius.bottom)) {
      result.bottomRight = Helpers.evaluateProp(cornerRadius.bottom, datum, active);
    }
    return result;
  }

  getCornerRadius(props) {
    const { cornerRadius, datum, active } = props;
    const result = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
    if (!cornerRadius) {
      return result;
    }
    if (isPlainObject(cornerRadius)) {
      return this.getCornerRadiusFromObject(props);
    }
    result.topLeft = Helpers.evaluateProp(cornerRadius, datum, active);
    result.topRight = Helpers.evaluateProp(cornerRadius, datum, active);
    return result;
  }

  render() {
    const {
      role, datum, active, shapeRendering, className, origin, polar, pathComponent, events, clipPath
    } = this.props;
    const stroke = this.props.style && this.props.style.fill || "black";
    const baseStyle = { fill: "black", stroke };
    const style = Helpers.evaluateStyle(assign(baseStyle, this.props.style), datum, active);
    const width = this.getBarWidth(this.props, style);
    const cornerRadius = this.getCornerRadius(this.props);
    const path = polar ?
      this.getPolarBarPath(this.props, cornerRadius) :
      this.getBarPath(this.props, width, cornerRadius);
    const defaultTransform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const transform = this.props.transform || defaultTransform;
    return React.cloneElement(pathComponent, {
      d: path, transform, className, style, role, shapeRendering, events, clipPath
    });
  }
}
