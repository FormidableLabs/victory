import React from "react";
import PropTypes from "prop-types";
import CommonProps from "./common-props";
import Helpers from "../victory-util/helpers";
import Line from "./line";
import { assign } from "lodash";

export default class Whisker extends React.Component {

  static propTypes = {
    ...CommonProps,
    groupComponent: PropTypes.element,
    lineComponent: PropTypes.element,
    majorWhisker: PropTypes.shape({
      x1: PropTypes.number,
      x2: PropTypes.number,
      y1: PropTypes.number,
      y2: PropTypes.number
    }),
    minorWhisker: PropTypes.shape({
      x1: PropTypes.number,
      x2: PropTypes.number,
      y1: PropTypes.number,
      y2: PropTypes.number
    })
  }

  static defaultProps = {
    groupComponent: <g />,
    lineComponent: <Line/>
  }

  render() {
    const {
      groupComponent, lineComponent, events, className, majorWhisker, minorWhisker, datum, active
    } = this.props;
    const style = Helpers.evaluateStyle(this.props.style, datum, active);
    const baseProps = { style, events, className };
    return React.cloneElement(groupComponent, {}, [
      React.cloneElement(lineComponent, assign({ key: "major-whisker" }, baseProps, majorWhisker)),
      React.cloneElement(lineComponent, assign({ key: "minor-whisker" }, baseProps, minorWhisker))
    ]);
  }
}
