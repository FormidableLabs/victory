import React from "react";
import PropTypes from "prop-types";
import CommonProps from "./common-props";
import { assign } from "lodash";

export default class Whisker extends React.Component {

  static propTypes = {
    ...CommonProps,
    groupComponent: PropTypes.element,
    majorWhisker: PropTypes.shape({
      x1: PropTypes.number,
      x2: PropTypes.number,
      y1: PropTypes.number,
      y2: PropTypes.number,
      strokeWidth: PropTypes.number,
      stroke: PropTypes.string
    }),
    minorWhisker: PropTypes.shape({
      x1: PropTypes.number,
      x2: PropTypes.number,
      y1: PropTypes.number,
      y2: PropTypes.number,
      strokeWidth: PropTypes.number,
      stroke: PropTypes.string
    })
  }

  static defaultProps = {
    groupComponent: <g />
  }

  getMajorWhiskerProps(props) {
    const { majorWhisker: { x1, y1, x2, y2, strokeWidth, stroke },
      events, className, style } = props;
    const attribs = { x1, y1, x2, y2, strokeWidth, stroke };

    return assign({
      ...style,
      ...attribs,
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
