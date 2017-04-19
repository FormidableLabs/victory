import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";

export default class Circle extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    index: PropTypes.number,
    datum: PropTypes.any,
    data: PropTypes.array,
    cx: PropTypes.number,
    cy: PropTypes.number,
    r: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string
  };

  componentWillMount() {
    this.style = this.getStyle(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const {cx, cy, r} = this.props;
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
    const { style, datum, active} = props;
    return Helpers.evaluateStyle(assign({stroke: "black", fill: "none"}, style), datum, active);
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
    const { cx, cy, r, events } = this.props;
    return this.renderAxisLine(this.props, this.style, events);
  }
}
