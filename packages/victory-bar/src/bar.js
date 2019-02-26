import React from "react";
import PropTypes from "prop-types";
import { Helpers, Path, CommonProps } from "victory-core";
import { assign, isPlainObject, isFunction, isNil } from "lodash";

import {
  getVerticalBarPath,
  getHorizontalBarPath,
  getVerticalPolarBarPath,
  getCustomBarPath
} from "./path-helper-methods";

export default class Bar extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    alignment: PropTypes.oneOf(["start", "middle", "end"]),
    barRatio: PropTypes.number,
    barWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
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
    pathComponent: <Path />,
    defaultBarWidth: 8
  };

  getBarPath(props, width, cornerRadius) {
    if (props.getPath) {
      return getCustomBarPath(props, width);
    }
    return props.horizontal
      ? getHorizontalBarPath(props, width, cornerRadius)
      : getVerticalBarPath(props, width, cornerRadius);
  }

  getPolarBarPath(props, cornerRadius) {
    // TODO Radial bars
    return getVerticalPolarBarPath(props, cornerRadius);
  }

  getBarWidth(props, style) {
    const { active, scale, data, datum, barWidth, defaultBarWidth } = props;
    if (barWidth) {
      return isFunction(barWidth) ? Helpers.evaluateProp(barWidth, datum, active) : barWidth;
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
    const realCornerRadius = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
    const updateCornerRadius = (corner, fallback) => {
      if (!isNil(cornerRadius[corner])) {
        realCornerRadius[corner] = Helpers.evaluateProp(cornerRadius[corner], datum, active);
      } else if (!isNil(cornerRadius[fallback])) {
        realCornerRadius[corner] = Helpers.evaluateProp(cornerRadius[fallback], datum, active);
      }
    };
    updateCornerRadius("topLeft", "top");
    updateCornerRadius("topRight", "top");
    updateCornerRadius("bottomLeft", "bottom");
    updateCornerRadius("bottomRight", "bottom");
    return realCornerRadius;
  }

  getCornerRadius(props) {
    const { cornerRadius, datum, active } = props;
    const realCornerRadius = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
    if (!cornerRadius) {
      return realCornerRadius;
    }
    if (isPlainObject(cornerRadius)) {
      return this.getCornerRadiusFromObject(props);
    } else {
      realCornerRadius.topLeft = Helpers.evaluateProp(cornerRadius, datum, active);
      realCornerRadius.topRight = Helpers.evaluateProp(cornerRadius, datum, active);
      return realCornerRadius;
    }
  }

  render() {
    const {
      role,
      datum,
      active,
      shapeRendering,
      className,
      origin,
      polar,
      pathComponent,
      events,
      clipPath
    } = this.props;
    const stroke = (this.props.style && this.props.style.fill) || "black";
    const baseStyle = { fill: "black", stroke };
    const style = Helpers.evaluateStyle(assign(baseStyle, this.props.style), datum, active);
    const width = this.getBarWidth(this.props, style);
    const cornerRadius = this.getCornerRadius(this.props);
    const path = polar
      ? this.getPolarBarPath(this.props, cornerRadius)
      : this.getBarPath(this.props, width, cornerRadius);
    const defaultTransform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const transform = this.props.transform || defaultTransform;
    return React.cloneElement(pathComponent, {
      d: path,
      transform,
      className,
      style,
      role,
      shapeRendering,
      events,
      clipPath
    });
  }
}
