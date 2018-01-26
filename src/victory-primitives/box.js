/*eslint no-magic-numbers: ["error", { "ignore": [0, 0.5, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
// import Helpers from "../victory-util/helpers";
// import Collection from "../victory-util/collection";
import { assign } from "lodash";
import CommonProps from "./common-props";

export default class Box extends React.Component {
  static propTypes = {
    ...CommonProps,
    boxWidth: PropTypes.number,
    groupComponent: PropTypes.element,
    horizontal: PropTypes.bool,
    max: PropTypes.number,
    median: PropTypes.number,
    min: PropTypes.number,
    position: PropTypes.string,
    q1: PropTypes.number,
    q3: PropTypes.number,
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
    const { x, y, q1, median, q3, boxWidth, horizontal,
      events, role, className, position, style } = props;
    let attribs;
    if (position === "min") {
      attribs = {
        x: horizontal ? q1 : x - boxWidth / 2,
        y: horizontal ? y - boxWidth / 2 : median,
        width: horizontal ? median - q1 : boxWidth,
        height: horizontal ? boxWidth : q1 - median,
        ...style
      };
    } else {
      attribs = {
        x: horizontal ? median : x - boxWidth / 2,
        y: horizontal ? y - boxWidth / 2 : q3,
        width: horizontal ? q3 - median : boxWidth,
        height: horizontal ? boxWidth : median - q3,
        ...style
      };
    }

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
