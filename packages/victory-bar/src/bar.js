import React from "react";
import PropTypes from "prop-types";
import { Helpers, Path, CommonProps } from "victory-core";
import { assign, isObject, isFunction } from "lodash";
import * as d3Shape from "d3-shape";

import { Circle, Point } from "./geometry-helper-methods";

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
        bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
      })
    ]),
    datum: PropTypes.object,
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

  getPosition(props, width) {
    const { x, y, y0, horizontal } = props;
    const alignment = props.alignment || "middle";
    const size = alignment === "middle" ? width / 2 : width;
    const sign = horizontal ? -1 : 1;
    return {
      x0: alignment === "start" ? x : x - (sign * size),
      x1: alignment === "end" ? x : x + (sign * size),
      y0,
      y1: y
    };
  }

  getVerticalBarPath(props, width, cornerRadius) {
    const { x0, x1, y0, y1 } = this.getPosition(props, width);
    const sign = y0 > y1 ? 1 : -1;
    const direction = sign > 0 ? "0 0 1" : "0 0 0";

    const hasSelfIntersectingPath = (sign === 1 && (y0 - cornerRadius.bottom) < (y1 + cornerRadius.top)) ||
      (sign === -1 && ((y1 - cornerRadius.bottom) < (y0 + cornerRadius.top)));

    const topArc = `${cornerRadius.top} ${cornerRadius.top} ${direction}`;
    const bottomArc = `${cornerRadius.bottom} ${cornerRadius.bottom} ${direction}`;

    // the usual result
    let start = `M ${x0 + cornerRadius.bottom}, ${y0}`;
    let bottomLeftArc = `A ${bottomArc}, ${x0}, ${y0 - sign * cornerRadius.bottom}`;
    let leftLine = `L ${x0}, ${y1 + sign * cornerRadius.top}`;
    let topLeftArc = `A ${topArc}, ${x0 + cornerRadius.top}, ${y1}`;
    let topLine = `L ${x1 - cornerRadius.top}, ${y1}`;
    let topRightArc = `A ${topArc}, ${x1}, ${y1 + sign * cornerRadius.top}`;
    let rightLine = `L ${x1}, ${y0 - sign * cornerRadius.bottom}`;
    let bottomRightArc = `A ${bottomArc}, ${x1 - cornerRadius.bottom}, ${y0}`;
    let end = "z";

    if (hasSelfIntersectingPath) {

      // There are three ways the verticalBarPath can self-intersect
      // 1.) The top and bottom cornerRadius are both > 0 (the topArc and bottomArc intersect)
      // 2.) The top cornerRadius > 0 but the bottom cornerRadius === 0 (the topArc and bottomLine intersect)
      // 3.) The top cornerRadius === 0 but the bottom cornerRadius > 0 (the bottomArc and topLine intersect)

      const topLeftCenter = new Point(x0 + cornerRadius.top, y1 + sign * cornerRadius.top);
      const topLeftCircle = new Circle(topLeftCenter, cornerRadius.top);
      const bottomLeftCenter = new Point(x0 + cornerRadius.bottom, y0 - sign * cornerRadius.bottom);
      const bottomLeftCircle = new Circle(bottomLeftCenter, cornerRadius.bottom);
      const topRightCenter = new Point(x1 - cornerRadius.top, y1 + sign * cornerRadius.top);
      const topRightCircle = new Circle(topRightCenter, cornerRadius.top);
      const bottomRightCenter = new Point(x1 - cornerRadius.bottom, y0 - sign * cornerRadius.bottom);
      const bottomRightCircle = new Circle(bottomRightCenter, cornerRadius.bottom);

      leftLine = null;
      rightLine = null;
      
      // case 1
      if (cornerRadius.top !== 0 && cornerRadius.bottom !== 0) {

        // find intersection of top left and bottom left arc
        // circles intersect at two points, get the left-most point
        const intrxnsLeft = topLeftCircle.intersection(bottomLeftCircle)[0];

        // find intersection of top right and bottom right arc
        // circles intersect at two points, get the right-most point
        const intrxnRight = topRightCircle.intersection(bottomRightCircle)[1];

        bottomLeftArc = `A ${bottomArc}, ${intrxnLeft.x}, ${intrxnLeft.y}`;
        topRightArc = `A ${topArc}, ${intrxnRight.x}, ${intrxnRight.y}`;
      }

      // case 2
      if (cornerRadius.top !== 0 && cornerRadius.bottom === 0) {

        // find intersection of y0 and the top left/right arc
        const intrxnLeftX = topLeftCircle.solveX(y0)[0];
        const intrxnRightX = topRightCircle.solveX(y0)[1];

        start = `M ${intrxnLeftX}, ${y0}`;
        bottomLeftArc = null;
        topRightArc = `A ${topArc}, ${intrxnRightX}, ${y0}`;
        bottomRightArc = null;

      }

      // case 3
      if (cornerRadius.top === 0 && cornerRadius.bottom !== 0) {

        // find intersection of y1 and the bottom left/right arc
        const intrxnLeftX = bottomLeftCircle.solveX(y1)[0];
        const intrxnRightX = bottomRightCircle.solveX(y1)[1];

        bottomLeftArc = `A ${bottomArc}, ${intrxnLeftX}, ${y1}`;
        topLeftArc = null;
        topLine = `L ${intrxnRightX}, ${y1}`;
        topRightArc = null;

      }
    }

    return [ start,
      bottomLeftArc,
      leftLine,
      topLeftArc,
      topLine,
      topRightArc,
      rightLine,
      bottomRightArc,
      end ].filter(l => l != null).join("\n");

  }

  getHorizontalBarPath(props, width, cornerRadius) {
    const { x0, x1, y0, y1 } = this.getPosition(props, width);
    const sign = y1 > y0 ? 1 : -1;
    const direction = sign > 0 ? "0 0 1" : "0 0 0";
    const topArc = `${cornerRadius.top} ${cornerRadius.top} ${direction}`;
    const bottomArc = `${cornerRadius.bottom} ${cornerRadius.bottom} ${direction}`;

    const start = `M ${y0}, ${x1 + sign * cornerRadius.bottom}`;
    const topLeftArc = `A ${bottomArc}, ${y0 + cornerRadius.bottom}, ${x1}`;
    const topLine = `L ${y1 - sign * cornerRadius.top}, ${x1}`;
    const topRightArc = `A ${topArc}, ${y1}, ${x1 + cornerRadius.top}`;
    const rightLine = `L ${y1}, ${x0 - cornerRadius.top}`;
    const bottomRightArc = `A ${topArc}, ${y1 - sign * cornerRadius.top}, ${x0}`;
    const bottomLine = `L ${y0 + cornerRadius.bottom}, ${x0 }`;
    const bottomLeftArc = `A ${bottomArc}, ${y0}, ${x0 - sign * cornerRadius.bottom}`;
    const end = "z";

    return [ start,
      topLeftArc,
      topLine,
      topRightArc,
      rightLine,
      bottomRightArc,
      bottomLine,
      bottomLeftArc,
      end ].join("\n");

  }

  transformAngle(angle) {
    return -1 * angle + (Math.PI / 2);
  }

  getAngularWidth(props, width) {
    const { scale } = props;
    const range = scale.y.range();
    const r = Math.max(...range);
    const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
    return (width / (2 * Math.PI * r)) * angularRange;
  }

  getAngle(props, index) {
    const { data, scale } = props;
    const x = data[index]._x1 === undefined ? "_x" : "_x1";
    return scale.x(data[index][x]);
  }

  getStartAngle(props, index) {
    const { data, scale, alignment } = props;
    const currentAngle = this.getAngle(props, index);
    const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
    const previousAngle = index === 0 ?
      this.getAngle(props, data.length - 1) - (Math.PI * 2) :
      this.getAngle(props, index - 1);
    if (index === 0 && angularRange < (2 * Math.PI)) {
      return scale.x.range()[0];
    } else if (alignment === "start" || alignment === "end") {
      return alignment === "start" ? previousAngle : currentAngle;
    } else {
      return (currentAngle + previousAngle) / 2;
    }
  }

  getEndAngle(props, index) {
    const { data, scale, alignment } = props;
    const currentAngle = this.getAngle(props, index);
    const angularRange = Math.abs(scale.x.range()[1] - scale.x.range()[0]);
    const lastAngle = scale.x.range()[1] === (2 * Math.PI) ?
      this.getAngle(props, 0) + (Math.PI * 2) : scale.x.range()[1];
    const nextAngle = index === data.length - 1 ?
      this.getAngle(props, 0) + (Math.PI * 2) : this.getAngle(props, index + 1);
    if (index === data.length - 1 && angularRange < (2 * Math.PI)) {
      return lastAngle;
    } else if (alignment === "start" || alignment === "end") {
      return alignment === "start" ? currentAngle : nextAngle;
    } else {
      return (currentAngle + nextAngle) / 2;
    }
  }

  getVerticalPolarBarPath(props, cornerRadius) { // eslint-disable-line max-statements
    const { datum, scale, index, alignment } = props;
    const style = Helpers.evaluateStyle(props.style, datum, props.active);
    const r1 = scale.y(datum._y0 || 0);
    const r2 = scale.y(datum._y1 !== undefined ? datum._y1 : datum._y);
    const currentAngle = scale.x(datum._x1 !== undefined ? datum._x1 : datum._x);
    let start;
    let end;
    if (style.width) {
      const width = this.getAngularWidth(props, style.width);
      const size = alignment === "middle" ? width / 2 : width;
      start = alignment === "start" ? currentAngle : currentAngle - size;
      end = alignment === "end" ? currentAngle : currentAngle + size;
    } else {
      start = this.getStartAngle(props, index);
      end = this.getEndAngle(props, index);
    }

    const getPath = (edge) => {
      const pathFunction = d3Shape.arc()
      .innerRadius(r1)
      .outerRadius(r2)
      .startAngle(this.transformAngle(start))
      .endAngle(this.transformAngle(end))
      .cornerRadius(cornerRadius[edge]);
      const path = pathFunction();
      const moves = path.match(/[A-Z]/g);
      const middle = moves.indexOf("L");
      const coords = path.split(/[A-Z]/).slice(1);
      const subMoves = edge === "top" ? moves.slice(0, middle) : moves.slice(middle);
      const subCoords = edge === "top" ? coords.slice(0, middle) : coords.slice(middle);
      return subMoves.map((m, i) => ({ command: m, coords: subCoords[i].split(",") }));
    };

    const moves = getPath("top").concat(getPath("bottom"));
    return moves.reduce((memo, move) => {
      memo += `${move.command} ${move.coords.join()}`;
      return memo;
    }, "");
  }

  getBarPath(props, width, cornerRadius) {
    return this.props.horizontal ?
      this.getHorizontalBarPath(props, width, cornerRadius) :
      this.getVerticalBarPath(props, width, cornerRadius);
  }

  getPolarBarPath(props, cornerRadius) {
    // TODO Radial bars
    return this.getVerticalPolarBarPath(props, cornerRadius);
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

  getCornerRadius(props) {
    const { cornerRadius, datum, active } = props;
    if (!cornerRadius) {
      return { top: 0, bottom: 0 };
    } else if (isObject(cornerRadius)) {
      return {
        top: Helpers.evaluateProp(cornerRadius.top, datum, active),
        bottom: Helpers.evaluateProp(cornerRadius.bottom, datum, active)
      };
    } else {
      return {
        top: Helpers.evaluateProp(cornerRadius, datum, active),
        bottom: 0
      };
    }
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
