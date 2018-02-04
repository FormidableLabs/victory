import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "./common-props";
import Line from "./line";

export default class Axis extends React.Component {
  static propTypes = {
    ...CommonProps,
    datum: PropTypes.any,
    lineComponent: PropTypes.element,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
  };

  static defaultProps = {
    lineComponent: <Line/>
  };

  render() {
    const {
      x1, x2, y1, y2, events, datum, active, lineComponent, className, role, shapeRendering
    } = this.props;
    const style = Helpers.evaluateStyle(
      assign({ stroke: "black" }, this.props.style), datum, active
    );
    return React.cloneElement(lineComponent, {
      style, className, role, shapeRendering, events, x1, x2, y1, y2
    });
  }
}
