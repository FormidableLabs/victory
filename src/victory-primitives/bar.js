import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign, isObject } from "lodash";
import CommonProps from "./common-props";
import Path from "./path";
import * as d3Shape from "d3-shape";

export default class Bar extends React.Component {

  static propTypes = {
    ...CommonProps,
    alignment: PropTypes.oneOf(["start", "middle", "end"]),
    barRatio: PropTypes.number,
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
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    pathComponent: PropTypes.element,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number
  };

  static defaultProps = {
    pathComponent: <Path/>
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
    const topArc = `${cornerRadius.top} ${cornerRadius.top} ${direction}`;
    const bottomArc = `${cornerRadius.bottom} ${cornerRadius.bottom} ${direction}`;
    return `M ${x0 + cornerRadius.bottom}, ${y0}
      A ${bottomArc}, ${x0}, ${y0 - sign * cornerRadius.bottom}
      L ${x0}, ${y1 + sign * cornerRadius.top}
      A ${topArc}, ${x0 + cornerRadius.top}, ${y1}
      L ${x1 - cornerRadius.top}, ${y1}
      A ${topArc}, ${x1}, ${y1 + sign * cornerRadius.top}
      L ${x1}, ${y0 - sign * cornerRadius.bottom}
      A ${bottomArc}, ${x1 - cornerRadius.bottom}, ${y0}
      z`;
  }

  getHorizontalBarPath(props, width, cornerRadius) {
    const { x0, x1, y0, y1 } = this.getPosition(props, width);
    const sign = y1 > y0 ? 1 : -1;
    const direction = sign > 0 ? "0 0 1" : "0 0 0";
    const topArc = `${cornerRadius.top} ${cornerRadius.top} ${direction}`;
    const bottomArc = `${cornerRadius.bottom} ${cornerRadius.bottom} ${direction}`;
    return `M ${y0}, ${x1 + sign * cornerRadius.bottom}
      A ${bottomArc}, ${y0 + cornerRadius.bottom}, ${x1}
      L ${y1 - sign * cornerRadius.top}, ${x1}
      A ${topArc}, ${y1}, ${x1 + cornerRadius.top}
      L ${y1}, ${x0 - cornerRadius.top}
      A ${topArc}, ${y1 - sign * cornerRadius.top}, ${x0}
      L ${y0 + cornerRadius.bottom}, ${x0 }
      A ${bottomArc}, ${y0}, ${x0 - sign * cornerRadius.bottom}
      z`;
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
    if (style.width) {
      return style.width;
    }
    const { scale, data } = props;
    const range = scale.x.range();
    const extent = Math.abs(range[1] - range[0]);
    const bars = data.length + 2;
    const barRatio = props.barRatio || 0.5;
    // eslint-disable-next-line no-magic-numbers
    const defaultWidth = data.length < 2 ? 8 : (barRatio * extent / bars);
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
      role, datum, active, shapeRendering, className, origin, polar, pathComponent, events
    } = this.props;
    const stroke = this.props.style && this.props.style.fill || "black";
    const baseStyle = { fill: "black", stroke };
    const style = Helpers.evaluateStyle(assign(baseStyle, this.props.style), datum, active);
    const width = this.getBarWidth(this.props, style);
    const cornerRadius = this.getCornerRadius(this.props);
    const path = polar ?
      this.getPolarBarPath(this.props, cornerRadius) :
      this.getBarPath(this.props, width, cornerRadius);
    const transform = polar && origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    return React.cloneElement(pathComponent, {
      d: path, transform, className, style, role, shapeRendering, events
    });
  }
}
