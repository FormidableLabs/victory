import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";
import CommonProps from "./common-props";

export default class Circle extends React.Component {
  static propTypes = {
    ...CommonProps,
    cx: PropTypes.number,
    cy: PropTypes.number,
    datum: PropTypes.any,
    r: PropTypes.number
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

  // Overridden in victory-core-native
  renderAxisLine(props, style, events) {
    const { role, shapeRendering, className, cx, cy, r } = props;
    return (
      <circle
        cx={cx} cy={cy} r={r}
        className={className}
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
