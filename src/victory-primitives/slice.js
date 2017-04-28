import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { isEqual } from "lodash";

export default class Slice extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    data: PropTypes.array,
    datum: PropTypes.object,
    events: PropTypes.object,
    index: PropTypes.number,
    pathFunction: PropTypes.func,
    role: PropTypes.string,
    shapeRendering: PropTypes.string,
    slice: PropTypes.object,
    style: PropTypes.object
  };

  componentWillMount() {
    const { style, path } = this.calculateAttributes(this.props);
    this.style = style;
    this.path = path;
  }

  shouldComponentUpdate(nextProps) {
    const { style, path } = this.calculateAttributes(nextProps);
    if (path !== this.path || !isEqual(style, this.style)) {
      this.style = style;
      this.path = path;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { style, datum, active, pathFunction, slice } = props;
    return {
      style: Helpers.evaluateStyle(style, datum, active),
      path: pathFunction(slice)
    };
  }

  // Overridden in victory-core-native
  renderSlice(path, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        d={path}
        className={className}
        role={role || "presentation"}
        style={style}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
  }

  render() {
    return this.renderSlice(this.path, this.style, this.props.events);
  }
}
