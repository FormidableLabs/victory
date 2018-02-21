import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import CommonProps from "./common-props";

export default class Box extends React.Component {
  static propTypes = {
    ...CommonProps,
    groupComponent: PropTypes.element,
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }

  static defaultProps = {
    groupComponent: <g/>
  };

  renderBox(boxProps) {
    return <rect {...boxProps} />;
  }

  getBoxProps(props) {
    const { x, y, width, height, events, role, className, style } = props;

    const attribs = { x, y, width, height, style };

    return assign({
      ...attribs,
      role,
      className
    }, events);
  }

  render() {
    const boxProps = this.getBoxProps(this.props);
    return React.cloneElement(
      this.props.groupComponent,
      {},
      this.renderBox(boxProps)
    );
  }
}
