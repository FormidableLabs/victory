import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import Collection from "../victory-util/collection";
import { assign } from "lodash";
import CommonProps from "./common-props";

export default class Line extends React.Component {
  static propTypes = {
    ...CommonProps,
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  };

  componentWillMount() {
    this.style = this.getStyle(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { className, x, y } = this.props;
    const style = this.getStyle(nextProps);
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [x, nextProps.x],
      [y, nextProps.y],
      [style, this.style]
    ])) {
      this.style = style;
      return true;
    }
    return false;
  }

  getStyle(props) {
    const { style, datum, active } = props;
    return Helpers.evaluateStyle(assign({ fill: "none" }, style), datum, active);
  }

  // Overridden in victory-core-native
  renderBorder(props, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <rect
        {...props}
        className={className}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        vectorEffect="non-scaling-stroke"
        {...events}
      />
    );
  }

  render() {
    const { x, y, width, height, events } = this.props;
    return this.renderBorder({ x, y, width, height }, this.style, events);
  }
}
