import React from "react";
import PropTypes from "prop-types";
import CommonProps from "./common-props";

export default class Whisker extends React.Component {

  static propTypes = {
    ...CommonProps,
    boxWidth: PropTypes.number,
    horizontal: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    position: PropTypes.string,
    q1: PropTypes.number,
    q3: PropTypes.number
  }

  static defaultProps = {
    groupComponent: <g />
  }

  getMajorWhiskerProps(props) {
    const { x, y, min, max, q1, q3, horizontal, className, position, style } = props;

    let attribs;
    /* process the major whiskers separately if this is the min - q1 whisker
    or if it's the q3 - max whisker */
    if (position === "min") {
      attribs = {
        x1: horizontal ? min : x,
        y1: horizontal ? y : min,
        x2: horizontal ? q1 : x,
        y2: horizontal ? y : q1,
        ...style
      };
    } else {
      attribs = {
        x1: horizontal ? q3 : x,
        y1: horizontal ? y : q3,
        x2: horizontal ? max : x,
        y2: horizontal ? y : max,
        ...style
      };
    }

    return {
      ...attribs,
      className
    };
  }
  getMinorWhiskerProps(props) {
    const { x, y, min, max, boxWidth, horizontal, className, position, style } = props;
    let attribs;
    /* process the minor whiskers separately if this is the min whisker
    or if it's the whisker */
    if (position === "min") {

      attribs = {
        x1: horizontal ? min : x - boxWidth / 2,
        y1: horizontal ? y - boxWidth / 2 : min,
        x2: horizontal ? min : x + boxWidth / 2,
        y2: horizontal ? y + boxWidth / 2 : min,
        ...style
      };
    } else {

      attribs = {
        x1: horizontal ? max : x - boxWidth / 2,
        y1: horizontal ? y - boxWidth / 2 : max,
        x2: horizontal ? max : x + boxWidth / 2,
        y2: horizontal ? y + boxWidth / 2 : max,
        ...style
      };
    }

    return {
      ...attribs,
      className
    };
  }
  renderWhisker(whiskerProps) {
    return <line {...whiskerProps} />;
  }
  render() {
    const majorWhiskerProps = this.getMajorWhiskerProps(this.props);
    const minorWhiskerProps = this.getMinorWhiskerProps(this.props);
    const majorWhisker = this.renderWhisker(majorWhiskerProps);
    const minorWhisker = this.renderWhisker(minorWhiskerProps);
    return React.cloneElement(
      this.props.groupComponent,
      {},
      majorWhisker,
      minorWhisker
    );
  }
}
