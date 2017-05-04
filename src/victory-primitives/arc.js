/*eslint no-magic-numbers: ["error", { "ignore": [2, 180] }]*/
import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";
import CommonProps from "./common-props";

export default class Arc extends React.Component {
  static propTypes = {
    ...CommonProps,
    closedPath: PropTypes.bool,
    cx: PropTypes.number,
    cy: PropTypes.number,
    datum: PropTypes.any,
    endAngle: PropTypes.number,
    r: PropTypes.number,
    startAngle: PropTypes.number
  };

  componentWillMount() {
    this.style = this.getStyle(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { cx, cy, r } = this.props;
    const style = this.getStyle(nextProps);
    if (cx !== nextProps.cx || cy !== nextProps.cy || r !== nextProps.r) {
      this.style = style;
      return true;
    }
    if (!isEqual(style, this.style)) {
      this.style = style;
      return true;
    }
    return false;
  }

  getStyle(props) {
    const { style, datum, active } = props;
    return Helpers.evaluateStyle(assign({ stroke: "black", fill: "none" }, style), datum, active);
  }

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  getArcPath(props) {
    const { cx, cy, r, startAngle, endAngle, closedPath } = props;
    // Always draw the path as two arcs so that complete circles may be rendered.
    const halfAngle = (endAngle - startAngle) / 2;
    const x1 = cx + r * Math.sin(this.degreesToRadians(startAngle));
    const y1 = cy + r * Math.cos(this.degreesToRadians(startAngle));
    const x2 = cx + r * Math.sin(this.degreesToRadians(halfAngle));
    const y2 = cy + r * Math.cos(this.degreesToRadians(halfAngle));
    const x3 = cx + r * Math.sin(this.degreesToRadians(endAngle));
    const y3 = cy + r * Math.cos(this.degreesToRadians(endAngle));
    const arcStart = closedPath ? ` M ${cx}, ${cy} L ${x1}, ${y1}` : `M ${x1}, ${y1}`;
    const arc1 = `A ${r}, ${r}, 0, 1, 0, ${x2}, ${y2}`;
    const arc2 = `A ${r}, ${r}, 0, 1, 0, ${x3}, ${y3}`;
    const arcEnd = closedPath ? "Z" : "";
    return `${arcStart} ${arc1} ${arc2} ${arcEnd}`;
  }

  // Overridden in victory-core-native
  renderAxisLine(props, style, events) {
    const { role, shapeRendering, className } = props;
    const path = this.getArcPath(props);
    return (
      <path className={className}
        d={path}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
  }

  render() {
    return this.renderAxisLine(this.props, this.style, this.props.events);
  }
}
