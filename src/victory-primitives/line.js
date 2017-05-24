import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import Collection from "../victory-util/collection";
import { assign } from "lodash";
import CommonProps from "./common-props";

export default class Line extends React.Component {
  static propTypes = {
    ...CommonProps,
    datum: PropTypes.any,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
  };

  componentWillMount() {
    this.style = this.getStyle(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { className, datum, x1, x2, y1, y2 } = this.props;
    const style = this.getStyle(nextProps);
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [x1, nextProps.x1],
      [x2, nextProps.x2],
      [y1, nextProps.y1],
      [y2, nextProps.y2],
      [style, this.style],
      [datum, nextProps.datum]
    ])) {
      this.style = style;
      return true;
    }
    return false;
  }

  getStyle(props) {
    const { style, datum, active } = props;
    return Helpers.evaluateStyle(assign({ stroke: "black" }, style), datum, active);
  }

  // Overridden in victory-core-native
  renderAxisLine(props, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <line
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
    const { x1, x2, y1, y2, events } = this.props;
    return this.renderAxisLine({ x1, x2, y1, y2 }, this.style, events);
  }
}
