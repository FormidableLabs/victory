import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";
import { assign, isEqual } from "lodash";

export default class Line extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    index: PropTypes.number,
    datum: PropTypes.any,
    data: PropTypes.array,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string
  };

  componentWillMount() {
    this.style = this.getStyle(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const {x1, x2, y1, y2} = this.props;
    const style = this.getStyle(nextProps);
    if (x1 !== nextProps.x1 || x2 !== nextProps.x2 || y1 !== nextProps.y1 || y2 !== nextProps.y2) {
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
    return Helpers.evaluateStyle(assign({stroke: "black"}, style), datum, active);
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
    return this.renderAxisLine({x1, x2, y1, y2}, this.style, events);
  }
}
