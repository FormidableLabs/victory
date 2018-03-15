import React from "react";
import PropTypes from "prop-types";
import CommonProps from "./common-props";
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

  getMajorWhiskerProps(props) {
    const { majorWhisker, events, className, style } = props;
    return assign({
      style,
      ...majorWhisker,
      className
    }, events);
  }

  getMinorWhiskerProps(props) {
    const { minorWhisker: { x1, y1, x2, y2, strokeWidth, stroke },
    style, events, className } = props;
    const attribs = { x1, y1, x2, y2, strokeWidth, stroke };

    return assign({
      ...style,
      ...attribs,
      className
    }, events);
  }

  renderWhisker(whiskerProps) {
    return <line {...whiskerProps} />;
  }

  render() {
    const {
      groupComponent, lineComponent, style, events, className, majorWhisker, minorWhisker
    } = this.props;

    return React.cloneElement(groupComponent, {}, [
      React.cloneElement(lineComponent, assign({ style, events, className }, majorWhisker)),
      React.cloneElement(lineComponent, assign({ style, events, className }, minorWhisker))
    ]);
  }
}
